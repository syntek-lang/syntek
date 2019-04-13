import { Token, TokenMatcher } from '../../../structures';

class Function extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Function, /^function(?!\w)/);
