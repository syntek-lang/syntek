import { LexicalToken, TokenLocation } from '.';

export class Token {
  readonly type: LexicalToken;

  readonly lexeme: string;

  readonly location: TokenLocation;

  constructor(type: LexicalToken, lexeme: string, location: TokenLocation) {
    this.type = type;
    this.lexeme = lexeme;
    this.location = location;
  }
}
