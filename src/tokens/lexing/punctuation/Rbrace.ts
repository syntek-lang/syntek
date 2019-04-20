import { Token, TokenMatcher } from '../../../structures/token';

export class Rbrace extends Token {
  build(): string {
    return '';
  }
}

export const RbraceMatcher = new TokenMatcher(Rbrace, /^\}/);
