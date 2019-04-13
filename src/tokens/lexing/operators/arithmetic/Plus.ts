import { Token, TokenMatcher } from '../../../../structures/token';

class Plus extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Plus, /^\+/);
