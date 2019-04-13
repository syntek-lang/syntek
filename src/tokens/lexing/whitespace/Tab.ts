import { Token, TokenMatcher } from '../../../structures/token';

class Tab extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Tab, /^\t/);
