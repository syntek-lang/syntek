import { Token, TokenMatcher } from '../../../../structures/token';

class BooleanKeyword extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(BooleanKeyword, /^boolean(?!\w)/);
