import { Token, TokenMatcher } from '../../../../structures/token';

class While extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(While, /^while(?!\w)/);
