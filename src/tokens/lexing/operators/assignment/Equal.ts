import { Token, TokenMatcher } from '../../../../structures/token';

class Equal extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Equal, /^=/);
