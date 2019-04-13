import { Token, TokenMatcher } from '../../../structures/token';

class Symbol extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Symbol, /^[a-z$_][a-z$_0-9]*/i);
