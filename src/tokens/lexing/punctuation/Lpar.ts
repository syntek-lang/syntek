import { Token, TokenMatcher } from '../../../structures/token';

export class Lpar extends Token {
  build(): string {
    return '';
  }
}

export const LparMatcher = new TokenMatcher(Lpar, /^\(/);
