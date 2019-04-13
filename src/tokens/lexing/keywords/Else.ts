import { Token, TokenMatcher } from '../../../structures/token';

class Else extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Else, /^else(?!\w)/);
