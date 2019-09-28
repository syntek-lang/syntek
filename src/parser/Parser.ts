import {
  Node, Token, LexicalToken, Program,
} from '../grammar';

import { Diagnostic, Level, ErrorHandler } from '../diagnostic';
import { Span } from '../position';

import { Precedence } from './Precedence';
import {
  declarationRules, expressionRules, statementRules,
  ExpressionParseRule,
} from './parse-rules';

import { expressionStmt } from './internal/statements/expressionStmt';

export class Parser {
  /**
   * The index of the current token
   */
  private index = 0;

  /**
   * The diagnostics reported during parsing
   */
  private readonly diagnostics: Diagnostic[] = [];

  /**
   * The tokens that are being parsed
   */
  private readonly tokens: Token[];

  /**
   * Create a new parser
   *
   * @param tokens - The tokens that need to be parsed
   */
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  /**
   * Parse the tokens
   *
   * @returns An AST and zero or more diagnostics. If one or more diagnostics are
   * returned the AST is invalid.
   */
  parse(): {
    ast: Program;
    diagnostics: Diagnostic[];
  } {
    const body: Node[] = [];

    while (!this.isEOF()) {
      try {
        body.push(this.declaration());
      } catch {
        this.sync();
      }
    }

    return {
      ast: new Program(body, new Span(
        body.length ? body[0].span.start : [0, 0],
        body.length ? body[body.length - 1].span.end : [0, 0],
      )),
      diagnostics: this.diagnostics,
    };
  }

  /**
   * Parse a declaration or statement
   *
   * @returns A new node
   */
  declaration(): Node {
    const handler = declarationRules[this.peek().type];

    let node: Node;
    if (handler) {
      this.advance();
      node = handler(this);
    } else {
      node = this.statement();
    }

    // Every declaration/statement should end with a '{', newline, or the full end
    if (!this.isEOF() && !this.check(LexicalToken.R_BRACE)) {
      this.consume(LexicalToken.NEWLINE, 'Expected a newline');
    }

    return node;
  }

  /**
   * Parse a statement
   *
   * @returns A new node
   */
  statement(): Node {
    const handler = statementRules[this.peek().type];

    if (handler) {
      this.advance();
      return handler(this);
    }

    return expressionStmt(this);
  }

  /**
   * Parse an expression
   *
   * @param msg - A message to display on error
   * @param errorHandler - A handler to assign more info to the error
   * @returns A new node
   */
  expression(msg?: string, errorHandler?: ErrorHandler): Node {
    return this.parsePrecedence(Precedence.OP1, msg, errorHandler);
  }

  parsePrecedence(precedence: Precedence, msg?: string, errorHandler?: ErrorHandler): Node {
    const prefixToken = this.advance();

    const prefixFn = this.getRule(prefixToken.type).prefix;
    if (!prefixFn) {
      throw this.error(msg || 'Expected a declaration, expression, or statement', this.previous().span, errorHandler);
    }

    const prefixNode = prefixFn(this, prefixToken);
    return this.parseInfix(precedence, prefixNode, msg, errorHandler);
  }

  parseInfix(
    precedence: Precedence,
    prefixNode: Node,
    msg?: string,
    errorHandler?: ErrorHandler,
  ): Node {
    let left = prefixNode;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let infixToken: Token;
      let infixRule: ExpressionParseRule;

      if (this.check(LexicalToken.NEWLINE)) {
        infixRule = this.getRule(this.peek(1).type);

        if (infixRule.prefix || precedence > infixRule.precedence) {
          break;
        } else {
          this.ignoreNewline();
          infixToken = this.advance();
        }
      } else {
        infixRule = this.getRule(this.peek().type);

        if (precedence > infixRule.precedence) {
          break;
        } else {
          infixToken = this.advance();
        }
      }

      if (precedence > infixRule.precedence) {
        break;
      }

      if (infixRule.infix) {
        left = infixRule.infix(this, left, infixToken);
      } else {
        throw this.error(msg || `Unexpected token '${this.peek().lexeme}'`, this.peek().span, errorHandler);
      }
    }

    return left;
  }

  /**
   * Get the expression parsing rule for a given token type
   *
   * @param type - The token type
   * @returns The expression parsing rule
   */
  getRule(type: LexicalToken): ExpressionParseRule {
    return expressionRules[type];
  }

  /**
   * Consume a token of a given type. Throws an error if a different type is found.
   *
   * @param type - The token type
   * @param msg - A message to display on error
   * @param errorHandler - A handler to assign more info to the error
   * @returns The consumed token
   */
  consume(type: LexicalToken, msg: string, errorHandler?: ErrorHandler): Token {
    if (this.check(type)) {
      return this.advance();
    }

    throw this.error(msg, this.peek().span, errorHandler);
  }

  /**
   * Match a token of a given type. If the token matches it is consumed.
   *
   * @param types - The token types
   * @returns Whether a token was matched
   */
  match(...types: LexicalToken[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  /**
   * Move to the next token and returns the previous token
   *
   * @returns The previous token
   */
  advance(): Token {
    if (!this.isEOF()) {
      this.index += 1;
    }

    return this.previous();
  }

  /**
   * Check for a token with the given type at the given offset without consuming it
   *
   * @param type - The token type
   * @param offset - The offset to check at
   * @returns Whether the token is at the given offset
   */
  check(type: LexicalToken, offset = 0): boolean {
    if (this.isEOF()) {
      return false;
    }

    return this.peek(offset).type === type;
  }

  /**
   * Whether the parser is at the end of the tokens, indicated an `EOF` token
   *
   * @returns Whether the parser is at the end
   */
  isEOF(): boolean {
    return this.peek().type === LexicalToken.EOF;
  }

  isEOL(): boolean {
    return this.check(LexicalToken.NEWLINE) || this.check(LexicalToken.R_BRACE) || this.isEOF();
  }

  /**
   * Peek at the token at the provided offset
   *
   * @param offset - The offset to peek at
   * @returns The token at the offset
   */
  peek(offset = 0): Token {
    return this.tokens[this.index + offset];
  }

  /**
   * Get the previous token of the parser
   *
   * @returns The previous token
   */
  previous(): Token {
    return this.peek(-1);
  }

  ignoreNewline(): void {
    if (this.check(LexicalToken.NEWLINE)) {
      this.advance();
    }
  }

  matchIgnoreNewline(...types: LexicalToken[]): boolean {
    const offset = this.check(LexicalToken.NEWLINE) ? 1 : 0;

    for (const type of types) {
      if (this.check(type, offset)) {
        this.ignoreNewline();
        this.advance();
        return true;
      }
    }

    return false;
  }

  /**
   * Report an error
   *
   * @param msg - The error message
   * @param span - The span of the error
   * @param errorHandler - A handler to assign more info to the error
   */
  error(msg: string, span: Span, errorHandler?: ErrorHandler): Error {
    const diagnostic = new Diagnostic(Level.ERROR, 'parser', msg, span);
    this.diagnostics.push(diagnostic);

    if (errorHandler) {
      errorHandler(diagnostic);
    }

    return new Error(msg);
  }

  /**
   * Sync the parser. This skips over tokens until a keyword is found that could
   * safely be parsed again, without giving incorrect errors.
   */
  private sync(): void {
    while (!this.isEOF()) {
      switch (this.peek().type) {
        case LexicalToken.CLASS:
        case LexicalToken.SWITCH:
        case LexicalToken.FUNCTION:
        case LexicalToken.IMPORT:
        case LexicalToken.FOR:
        case LexicalToken.WHILE:
        case LexicalToken.RETURN:
        case LexicalToken.VAR:
          return;
        default:
          this.advance();
      }
    }
  }
}
