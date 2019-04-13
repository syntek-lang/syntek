import { Token, TokenMatcher } from '../../../../structures';

class Equal extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Equal, /^=/);
