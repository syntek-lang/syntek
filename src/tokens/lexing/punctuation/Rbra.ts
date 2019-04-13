import { Token, TokenMatcher } from '../../../structures';

class Rbra extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Rbra, /^\]/);
