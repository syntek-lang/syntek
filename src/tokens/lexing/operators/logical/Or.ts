import { Token, TokenMatcher } from '../../../../structures/token';

class Or extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Or, /^or(?!\w)/);
