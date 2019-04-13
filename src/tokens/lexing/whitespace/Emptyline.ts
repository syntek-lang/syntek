import { Token, TokenMatcher } from '../../../structures/token';

class Emptyline extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Emptyline, /^(\r?\n[ \t\f]*\r?\n)+/);
