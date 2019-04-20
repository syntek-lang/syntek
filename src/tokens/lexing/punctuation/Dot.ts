import { Token, TokenMatcher } from '../../../structures/token';

export class Dot extends Token {
  build(): string {
    return '';
  }
}

export const DotMatcher = new TokenMatcher(Dot, /^\./);
