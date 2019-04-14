import { Token, TokenMatcher } from '../../../../structures/token';

class If extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(If, /^if(?!\w)/);
