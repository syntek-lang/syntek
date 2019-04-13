import { Token, TokenMatcher } from '../../../structures/token';

class Return extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Return, /^returns?(?!\w)/);
