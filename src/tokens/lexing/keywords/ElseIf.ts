import { Token, TokenMatcher } from '../../../structures';

class ElseIf extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ElseIf, /^else if(?!\w)/);
