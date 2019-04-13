import { Token, TokenMatcher } from '../../../../structures';

class And extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(And, /^and(?!\w)/);
