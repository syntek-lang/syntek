import { Token, TokenMatcher } from '../../../structures';

class Pow extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Pow, /^\^/);
