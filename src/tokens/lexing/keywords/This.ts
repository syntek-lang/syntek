import { Token, TokenMatcher } from '../../../structures/token';

class This extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(This, /^this?(?!\w)/);
