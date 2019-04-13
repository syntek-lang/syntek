import { Token, TokenMatcher } from '../../../structures/token';

class Rbra extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Rbra, /^\]/);
