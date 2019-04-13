import { Token, TokenMatcher } from '../../../../structures/token';

class Star extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Star, /^\*/);
