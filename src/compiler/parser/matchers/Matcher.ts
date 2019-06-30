import { Node, Token, LexicalToken } from '../..';

import { Precedence } from './Precedence';
import { ParseRule, rules } from './ParseRule';

export class Matcher {
  private current = 0;

  private tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  expression(): Node {
    return this.parsePrecedence(Precedence.OP2);
  }

  protected parsePrecedence(precedence: Precedence): Node {
    const prefixToken = this.advance();

    const prefixRule = this.getRule(prefixToken.type).prefix;
    if (!prefixRule) {
      // TODO: proper error handling
      throw new Error('Expected expression');
    }

    let left: Node = prefixRule.call(this, prefixToken);

    while (precedence <= this.getRule(this.peek().type).precedence) {
      const infixToken = this.advance();
      const infixRule = this.getRule(infixToken.type).infix;

      if (infixRule) {
        left = infixRule.call(this, left, infixToken);
      }
    }

    return left;
  }

  protected getRule(type: LexicalToken): ParseRule {
    return rules[type];
  }

  protected isWhitespace(token: Token): boolean {
    return token.type === LexicalToken.NEWLINE
      || token.type === LexicalToken.INDENT
      || token.type === LexicalToken.OUTDENT
      || token.type === LexicalToken.COMMENT;
  }

  protected eatWhitespace(): void {
    while (this.isWhitespace(this.peek())) {
      // Consume whitespace
      this.advance();
    }
  }

  protected consume(type: LexicalToken, message: string): Token {
    if (this.check(type)) {
      return this.advance();
    }

    // TODO: proper error handling
    console.error(this.peek(), message);
    throw new Error();
  }

  protected match(...types: LexicalToken[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  protected advance(): Token {
    if (!this.isAtEnd()) {
      this.current += 1;
    }

    return this.previous();
  }

  protected check(type: LexicalToken): boolean {
    if (this.isAtEnd()) {
      return false;
    }

    return this.peek().type === type;
  }

  protected isAtEnd(): boolean {
    return this.peek().type === LexicalToken.EOF;
  }

  protected peek(amount = 0): Token {
    return this.tokens[this.current + amount];
  }

  protected previous(): Token {
    return this.peek(-1);
  }

  protected peekIgnoreWhitespace(amount = 0): Token {
    let whitespaceAmount = 0;

    while (this.isWhitespace(this.peek(whitespaceAmount))) {
      whitespaceAmount += 1;
    }

    return this.peek(amount + whitespaceAmount);
  }
}
