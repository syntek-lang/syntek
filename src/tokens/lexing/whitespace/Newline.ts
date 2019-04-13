import { Token, TokenMatcher } from '../../../structures';

class Newline extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Newline, /^\r?\n/);
