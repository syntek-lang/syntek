import { Token, TokenMatcher } from '../../../structures/token';

class Newline extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Newline, /^\r?\n/);
