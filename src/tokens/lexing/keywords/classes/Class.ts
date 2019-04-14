import { Token, TokenMatcher } from '../../../../structures/token';

class Class extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Class, /^class(?!\w)/);
