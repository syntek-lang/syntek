import { Token, TokenMatcher } from '../../../structures';

class Repeat extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Repeat, /^repeat(?!\w)/);
