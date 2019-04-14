import { Token, TokenMatcher } from '../../../../structures/token';

class NumberKeyword extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(NumberKeyword, /^number(?!\w)/);
