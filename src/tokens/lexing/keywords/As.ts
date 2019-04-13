import { Token, TokenMatcher } from '../../../structures';

class As extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(As, /^as(?!\w)/);
