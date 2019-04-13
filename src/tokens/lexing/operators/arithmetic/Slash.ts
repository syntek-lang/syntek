import { Token, TokenMatcher } from '../../../../structures/token';

class Slash extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Slash, /^\//);
