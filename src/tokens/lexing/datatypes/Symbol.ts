import { Token, TokenMatcher } from '../../../structures/token';

class Symbol extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Symbol, /^[a-zA-Z_]\w*/);
