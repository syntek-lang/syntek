import { Token, TokenMatcher } from '../../../structures/token';

class String extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(String, /^'(?:[^'\\]|\\.)*'/);
