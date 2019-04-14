import { Token, TokenMatcher } from '../../../../structures/token';

class For extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(For, /^for(?!\w)/);
