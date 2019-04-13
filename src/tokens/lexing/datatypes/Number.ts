import { Token, TokenMatcher } from '../../../structures';

class Number extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Number, /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/);
