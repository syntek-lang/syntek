import { Token, TokenMatcher } from '../../structures';

class Expression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Expression);
