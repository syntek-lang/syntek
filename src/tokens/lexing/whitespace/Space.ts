import { Token, TokenMatcher } from '../../../structures/token';

class Space extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Space, /^ +/);
