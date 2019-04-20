import { Token, TokenMatcher } from '../../../structures/token';

export class Rpar extends Token {
  build(): string {
    return '';
  }
}

export const RparMatcher = new TokenMatcher(Rpar, /^\)/);
