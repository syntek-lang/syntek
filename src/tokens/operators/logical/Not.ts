import { Token, TokenMatcher } from '../../../structures';

class Not extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Not, /^not(?!\w)/);
