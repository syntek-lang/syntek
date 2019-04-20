import { Token, TokenMatcher } from '../../../../structures/token';

export class Pow extends Token {
  build(): string {
    return '';
  }
}

export const PowMatcher = new TokenMatcher(Pow, /^\^/);
