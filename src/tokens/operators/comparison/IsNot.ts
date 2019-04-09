import { Token, TokenMatcher } from '../../../structures';

class IsNot extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(IsNot, /^is not(?!\w)/);
