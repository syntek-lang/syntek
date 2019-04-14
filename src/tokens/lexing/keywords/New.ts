import { Token, TokenMatcher } from '../../../structures/token';

class New extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(New, /^new(?!\w)/);
