import { Token, TokenMatcher } from '../../../../structures/token';

class AnyKeyword extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(AnyKeyword, /^any(?!\w)/);
