import { Token, TokenMatcher } from '../../structures';

class If extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(If, /^if(?!\w)/);
