import { Token, TokenMatcher } from '../../../structures';

class Star extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Star, /^\*/);
