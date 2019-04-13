import { Token, TokenMatcher } from '../../../structures/token';

class Repeat extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Repeat, /^repeat(?!\w)/);
