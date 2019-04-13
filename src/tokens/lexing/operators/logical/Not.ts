import { Token, TokenMatcher } from '../../../../structures/token';

class Not extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Not, /^not(?!\w)/);
