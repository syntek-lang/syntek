import { Token, TokenMatcher } from '../../../structures/token';

class Comma extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Comma, /^,/);
