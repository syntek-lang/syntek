import { Token, TokenMatcher } from '../../../../structures/token';

class ObjectKeyword extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ObjectKeyword, /^object(?!\w)/);
