import { Token, TokenMatcher } from '../../../structures';

class While extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(While, /^while(?!\w)/);
