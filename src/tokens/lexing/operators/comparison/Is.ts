import { Token, TokenMatcher } from '../../../../structures/token';

class Is extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Is, /^is(?!\w)/);
