import { Token, TokenMatcher } from '../../../structures/token';

class Lpar extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Lpar, /^\(/);
