import { Token, TokenMatcher } from '../../structures';

class Else extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Else, /^else(?!\w)/);
