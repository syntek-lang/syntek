import { Token, TokenMatcher } from '../../../structures/token';

class In extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(In, /^in(?!\w)/);
