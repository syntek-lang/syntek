import { Token, TokenMatcher } from '../../../../structures/token';

class Modulo extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Modulo, /^%/);
