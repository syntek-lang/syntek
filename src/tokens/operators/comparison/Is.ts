import { Token, TokenMatcher } from '../../../structures';

class Is extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Is, /^is(?!\w)/);
