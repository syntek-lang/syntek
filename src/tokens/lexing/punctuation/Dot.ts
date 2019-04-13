import { Token, TokenMatcher } from '../../../structures/token';

class Dot extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Dot, /^\./);
