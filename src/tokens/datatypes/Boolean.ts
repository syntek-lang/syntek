import { Token, TokenMatcher } from '../../structures';

class Boolean extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Boolean, /^(true|false)(?!\w)/);
