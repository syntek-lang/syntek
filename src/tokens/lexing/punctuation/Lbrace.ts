import { Token, TokenMatcher } from '../../../structures/token';

export class Lbrace extends Token {
  build(): string {
    return '';
  }
}

export const LbraceMatcher = new TokenMatcher(Lbrace, /^\{/);
