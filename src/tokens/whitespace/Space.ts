import { Token, TokenMatcher } from '../../structures';

class Space extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Space, /^ +/);
