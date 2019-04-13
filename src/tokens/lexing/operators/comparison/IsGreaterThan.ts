import { Token, TokenMatcher } from '../../../../structures/token';

class IsGreaterThan extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(IsGreaterThan, /^is greater than(?!\w)/);
