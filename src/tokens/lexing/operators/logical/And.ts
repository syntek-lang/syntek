import { Token, TokenMatcher } from '../../../../structures/token';

class And extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(And, /^and(?!\w)/);
