import { Token, TokenMatcher } from '../../../../structures/token';

class IsNot extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(IsNot, /^is not(?!\w)/);
