import { Token, TokenMatcher } from '../../../structures';

class Dot extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Dot, /^\./);
