import { Token, TokenMatcher } from '../../../../structures/token';

class Continue extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Continue, /^continue(?!\w)/);
