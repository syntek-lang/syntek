import { Token, TokenMatcher } from '../../../structures/token';

class Rbrace extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Rbrace, /^\}/);
