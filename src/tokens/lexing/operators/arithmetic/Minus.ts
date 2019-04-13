import { Token, TokenMatcher } from '../../../../structures';

class Minus extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Minus, /^-/);
