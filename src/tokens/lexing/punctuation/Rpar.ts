import { Token, TokenMatcher } from '../../../structures/token';

class Rpar extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Rpar, /^\)/);
