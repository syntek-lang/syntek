import { Token, TokenMatcher } from '../../../structures/token';

class Break extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Break, /^break(?!\w)/);
