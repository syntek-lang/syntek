import { Token, TokenMatcher } from '../../../structures';

class Modulo extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Modulo, /^%/);
