import { Token, TokenMatcher } from '../../../structures';

class Tab extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Tab, /^\t/);
