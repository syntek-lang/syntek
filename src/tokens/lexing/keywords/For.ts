import { Token, TokenMatcher } from '../../../structures';

class For extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(For, /^for(?!\w)/);
