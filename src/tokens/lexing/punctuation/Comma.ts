import { Token, TokenMatcher } from '../../../structures';

class Comma extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Comma, /^,/);
