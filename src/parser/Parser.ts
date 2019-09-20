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
   * The current index
   */
  private current = 0;

  /**
   * The amount of indents consumed. Used for syncing
   */
  private indent = 0;

  /**
   * Whether there has been an error
   */
  private hasError = false;

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

    while (!this.isAtEnd()) {
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
    if (handler) {
      this.advance();
      return handler(this);
    }

    return this.statement();
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
    return this.parsePrecedence(Precedence.OP2, msg, errorHandler);
  }

  parsePrecedence(precedence: Precedence, msg?: string, errorHandler?: ErrorHandler): Node {
    const prefixToken = this.advance();

    const prefixFn = this.getRule(prefixToken.type).prefix;
    if (!prefixFn) {
      if (this.hasError && this.previous().type === LexicalToken.OUTDENT) {
        // When the program is already invalid, and an outdent token is invalid it is not reported
        // This prevents error reports in the wrong places
        throw new Error('Invalid outdent in error mode');
      } else {
        throw this.error(msg || 'Expected a declaration, expression, or statement', this.previous().span, errorHandler);
      }
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
      let ignoredWhitespaceToken: Token | null = null;

      // Break if the next token's precedence is lower than the wanted
      if (precedence > this.getRule(this.peek().type).precedence) {
        ignoredWhitespaceToken = this.peekIgnoreWhitespace();

        if (precedence > this.getRule(ignoredWhitespaceToken.type).precedence) {
          break;
        }
      }

      let infixRule: ExpressionParseRule;
      let infixToken: Token;

      // When a token was found after ignoring whitespace check if the rule
      // associated with that token allows ignoring whitespace. If it does trim
      // the whitespace and advance.
      if (ignoredWhitespaceToken) {
        infixRule = this.getRule(ignoredWhitespaceToken.type);

        // If the token does not have a prefix rule whitespace can be ignored
        if (!infixRule.prefix) {
          this.eatWhitespace();
          infixToken = this.advance();
        } else {
          break;
        }
      } else {
        infixToken = this.advance();
        infixRule = this.getRule(infixToken.type);
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
   * Whether the given token is whitespace
   *
   * @param token - The token to check
   * @returns Whether the given token is whitespace
   */
  isWhitespace(token: Token): boolean {
    return token.type === LexicalToken.NEWLINE
      || token.type === LexicalToken.INDENT
      || token.type === LexicalToken.OUTDENT;
  }

  /**
   * Eat whitespace whitespace if possible. Stores the indent count so it can be synced.
   */
  eatWhitespace(): void {
    while (this.isWhitespace(this.peek())) {
      // Consume whitespace
      const token = this.advance();

      if (token.type === LexicalToken.INDENT) {
        this.indent += 1;
      } else if (token.type === LexicalToken.OUTDENT) {
        this.indent -= 1;
      }
    }
  }

  /**
   * Sync the indentation, adding indent or outdent tokens
   */
  syncIndentation(): void {
    // TODO: This can probably be optimized by checking `indent` in parse methods
    // instead of merging new tokens into the array
    while (this.indent !== 0) {
      if (this.indent > 0) {
        if (this.check(LexicalToken.OUTDENT)) {
          this.advance();
        } else {
          this.tokens.splice(this.current, 0, new Token(LexicalToken.INDENT, '\t', new Span([0, 0], [0, 0])));
        }

        this.indent -= 1;
      } else {
        if (this.check(LexicalToken.INDENT)) {
          this.advance();
        } else {
          this.tokens.splice(this.current, 0, new Token(LexicalToken.OUTDENT, '', new Span([0, 0], [0, 0])));
        }

        this.indent += 1;
      }
    }
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
    if (!this.isAtEnd()) {
      this.current += 1;
    }

    return this.previous();
  }

  /**
   * Check for a token with the given type at the given offset
   *
   * @param type - The token type
   * @param offset - The offset to check at
   * @returns Whether the token is at the given offset
   */
  check(type: LexicalToken, offset = 0): boolean {
    if (this.isAtEnd()) {
      return false;
    }

    return this.peek(offset).type === type;
  }

  /**
   * Whether the parser is at the end of the tokens, indicated an `EOF` token
   *
   * @returns Whether the parser is at the end
   */
  isAtEnd(): boolean {
    return this.peek().type === LexicalToken.EOF;
  }

  /**
   * Peek at the token at the provided offset
   *
   * @param offset - The offset to peek at
   * @returns The token at the offset
   */
  peek(offset = 0): Token {
    return this.tokens[this.current + offset];
  }

  /**
   * Get the previous token of the parser
   *
   * @returns The previous token
   */
  previous(): Token {
    return this.peek(-1);
  }

  /**
   * Peek at the next token, ignoring whitespace
   *
   * @returns The token
   */
  peekIgnoreWhitespace(): Token {
    let whitespaceAmount = 0;

    while (this.isWhitespace(this.peek(whitespaceAmount))) {
      whitespaceAmount += 1;
    }

    return this.peek(whitespaceAmount);
  }

  /**
   * Match a token of a given type. If the token matches it is consumed. Whitespace is ignored.
   *
   * @param types - The token types
   * @returns Whether a token was matched
   */
  matchIgnoreWhitespace(...types: LexicalToken[]): boolean {
    const token = this.peekIgnoreWhitespace();

    if (types.includes(token.type)) {
      this.eatWhitespace();
      this.advance();
      return true;
    }

    return false;
  }

  /**
   * Skip over tokens
   *
   * @param amount - The amount of tokens to skip
   */
  skip(amount: number): void {
    this.current += amount;
  }

  /**
   * Report an error
   *
   * @param msg - The error message
   * @param span - The span of the error
   * @param errorHandler - A handler to assign more info to the error
   */
  error(msg: string, span: Span, errorHandler?: ErrorHandler): Error {
    this.hasError = true;

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
  sync(): void {
    this.indent = 0;

    while (!this.isAtEnd()) {
      switch (this.peek().type) {
        case LexicalToken.VAR:
        case LexicalToken.FUNCTION:
        case LexicalToken.CLASS:
        case LexicalToken.IMPORT:
        case LexicalToken.IF:
        case LexicalToken.SWITCH:
        case LexicalToken.FOR:
        case LexicalToken.REPEAT:
        case LexicalToken.WHILE:
        case LexicalToken.RETURN:
          return;
        default:
          this.advance();
      }
    }
  }
}
