import { Token, TokenMatcher } from '../../../structures';

class Return extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Return, /^returns?(?!\w)/);
