import { Token, TokenMatcher } from '../../../../structures/token';

class Minus extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Minus, /^-/);
