import {
  Node, Token, LexicalToken, Program,
} from '../../grammar';

import { checkVar } from './parse-utils';
import { Precedence } from './Precedence';
import {
  declarationRules, expressionRules, statementRules,
  ExpressionParseRule,
} from './parse-rules';

import { variableDecl } from './internal/declarations/variableDecl';
import { expressionStmt } from './internal/statements/expressionStmt';

type UnexpectedTokens = { key: string; token: Token }[];

export class Parser {
  private current = 0;

  private indent = 0;

  private hasError = false;

  private errors: UnexpectedTokens = [];

  private tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens.filter(token => token.type !== LexicalToken.WHITESPACE);
  }

  parse(): {
    ast: Program;
    errors: UnexpectedTokens;
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
      ast: new Program(body, {
        start: body.length ? body[0].location.start : [0, 0],
        end: body.length ? body[body.length - 1].location.end : [0, 0],
      }),
      errors: this.errors,
    };
  }

  declaration(): Node {
    const varDecl = checkVar(this);

    if (varDecl) {
      const equalOffset = varDecl.variableType ? varDecl.variableType.arrayDepth * 2 + 2 : 1;

      if (this.peekIgnoreWhitespace(equalOffset).type === LexicalToken.EQUAL) {
        return variableDecl(this, varDecl);
      }
    }

    const handler = declarationRules[this.peek().type];
    if (handler) {
      this.advance();
      return handler(this);
    }

    return this.statement();
  }

  statement(): Node {
    const handler = statementRules[this.peek().type];

    if (handler) {
      this.advance();
      return handler(this);
    }

    return expressionStmt(this);
  }

  expression(errorKey?: string): Node {
    return this.parsePrecedence(Precedence.OP2, errorKey);
  }

  parsePrecedence(precedence: Precedence, errorKey?: string): Node {
    const prefixToken = this.advance();

    const prefixFn = this.getRule(prefixToken.type).prefix;
    if (!prefixFn) {
      if (this.hasError && this.previous().type === LexicalToken.OUTDENT) {
        // When the program is already invalid, and an outdent token is invalid it is not reported
        // This prevents error reports in the wrong places
        throw new Error('Invalid outdent in error mode');
      } else {
        throw this.error(this.previous(), errorKey || 'expected_decl_expr_stmt');
      }
    }

    let left: Node = prefixFn(this, prefixToken);

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

        if (infixRule.ignoreWhiteSpace) {
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
        throw this.error(this.peek(), 'unexpected_token');
      }
    }

    return left;
  }

  getRule(type: LexicalToken): ExpressionParseRule {
    return expressionRules[type];
  }

  isWhitespace(token: Token): boolean {
    return token.type === LexicalToken.NEWLINE
      || token.type === LexicalToken.INDENT
      || token.type === LexicalToken.OUTDENT;
  }

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

  syncIndentation(): void {
    while (this.indent !== 0) {
      if (this.indent > 0) {
        if (this.check(LexicalToken.OUTDENT)) {
          this.advance();
        } else {
          this.tokens.splice(this.current, 0, new Token(LexicalToken.INDENT, '\t', { start: [0, 0], end: [0, 0] }));
        }

        this.indent -= 1;
      } else {
        if (this.check(LexicalToken.INDENT)) {
          this.advance();
        } else {
          this.tokens.splice(this.current, 0, new Token(LexicalToken.OUTDENT, '', { start: [0, 0], end: [0, 0] }));
        }

        this.indent += 1;
      }
    }
  }

  consume(type: LexicalToken, errorKey: string): Token {
    if (this.check(type)) {
      return this.advance();
    }

    throw this.error(this.peek(), errorKey);
  }

  match(...types: LexicalToken[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  advance(): Token {
    if (!this.isAtEnd()) {
      this.current += 1;
    }

    return this.previous();
  }

  check(type: LexicalToken, offset = 0): boolean {
    if (this.isAtEnd()) {
      return false;
    }

    return this.peek(offset).type === type;
  }

  isAtEnd(): boolean {
    return this.peek().type === LexicalToken.EOF;
  }

  peek(offset = 0): Token {
    return this.tokens[this.current + offset];
  }

  previous(): Token {
    return this.peek(-1);
  }

  peekIgnoreWhitespace(offset = 0): Token {
    let whitespaceAmount = 0;

    while (this.isWhitespace(this.peek(offset + whitespaceAmount))) {
      whitespaceAmount += 1;
    }

    return this.peek(offset + whitespaceAmount);
  }

  skip(amount: number): void {
    this.current += amount;
  }

  error(token: Token, key: string): Error {
    this.hasError = true;
    this.errors.push({
      key: `compiler.parser.${key}`,
      token,
    });
    return new Error(key);
  }

  sync(): void {
    this.current -= 1;
    this.indent = 0;

    while (!this.isAtEnd()) {
      switch (this.peek().type) {
        case LexicalToken.FUNCTION:
        case LexicalToken.CLASS:
        case LexicalToken.IMPORT:
        case LexicalToken.IF:
        case LexicalToken.SWITCH:
        case LexicalToken.FOR:
        case LexicalToken.REPEAT:
        case LexicalToken.WHILE:
        case LexicalToken.TRY:
        case LexicalToken.THROW:
        case LexicalToken.RETURN:
          return;
        default:
          this.advance();
      }
    }
  }
}
