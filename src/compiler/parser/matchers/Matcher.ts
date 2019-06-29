import { Token, LexicalToken } from '../..';

export abstract class Matcher {
  private current = 0;

  private tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  protected eatWhitespace(): void {
    while (this.match(LexicalToken.NEWLINE, LexicalToken.INDENT, LexicalToken.OUTDENT)) {
      // Whitespace is being consumed :)
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
    return this.tokens[this.current - 1];
  }
}
