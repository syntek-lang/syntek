import { Token, TokenMatcher } from '../../../../structures';

class Or extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Or, /^or(?!\w)/);
