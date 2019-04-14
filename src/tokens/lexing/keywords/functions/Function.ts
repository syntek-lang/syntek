import { Token, TokenMatcher } from '../../../../structures/token';

class Function extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Function, /^function(?!\w)/);
