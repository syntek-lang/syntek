import { Token, TokenMatcher } from '../../../../structures/token';

class Pow extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Pow, /^\^/);
