import { Token, TokenMatcher } from '../../../structures';

class Slash extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Slash, /^\//);
