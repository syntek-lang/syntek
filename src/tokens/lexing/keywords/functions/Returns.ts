import { Token, TokenMatcher } from '../../../../structures/token';

class Returns extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Returns, /^returns(?!\w)/);
