import { Token, TokenMatcher } from '../../../structures/token';

class Static extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Static, /^static(?!\w)/);
