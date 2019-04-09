import { Token, TokenMatcher } from '../../structures';

class Lpar extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Lpar, /^\(/);
