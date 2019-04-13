import { Token, TokenMatcher } from '../../../structures/token';

class Comment extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Comment, /^ *#[^\r\n]*/);
