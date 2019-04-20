import { Token, TokenMatcher } from '../../../../structures/token';

export class Star extends Token {
  build(): string {
    return '';
  }
}

export const StarMatcher = new TokenMatcher(Star, /^\*/);
