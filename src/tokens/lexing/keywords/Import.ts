import { Token, TokenMatcher } from '../../../structures';

class Import extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Import, /^import(?!\w)/);
