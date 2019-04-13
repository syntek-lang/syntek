import { Token, TokenMatcher } from '../../../structures/token';

class Lbra extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Lbra, /^\[/);
