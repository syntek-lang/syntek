import { Token, TokenMatcher } from '../../../structures';

class Rpar extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Rpar, /^\)/);
