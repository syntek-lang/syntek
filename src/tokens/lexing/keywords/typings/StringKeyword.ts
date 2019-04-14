import { Token, TokenMatcher } from '../../../../structures/token';

class StringKeyword extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(StringKeyword, /^string(?!\w)/);
