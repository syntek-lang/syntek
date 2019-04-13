import { Token, TokenMatcher } from '../../../structures';

class String extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(String, /^'(?:[^'\\]|\\.)*'/);
