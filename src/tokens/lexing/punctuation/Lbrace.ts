import { Token, TokenMatcher } from '../../../structures/token';

class Lbrace extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Lbrace, /^\{/);
