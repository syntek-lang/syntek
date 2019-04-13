import { Token, TokenMatcher } from '../../../../structures';

class Plus extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Plus, /^\+/);
