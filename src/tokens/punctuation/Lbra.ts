import { Token, TokenMatcher } from '../../structures';

class Lbra extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Lbra, /^\[/);
