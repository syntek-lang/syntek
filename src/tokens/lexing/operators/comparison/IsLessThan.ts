import { Token, TokenMatcher } from '../../../../structures';

class IsLessThan extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(IsLessThan, /^is less than(?!\w)/);
