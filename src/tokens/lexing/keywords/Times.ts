import { Token, TokenMatcher } from '../../../structures/token';

class Times extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Times, /^times(?!\w)/);
