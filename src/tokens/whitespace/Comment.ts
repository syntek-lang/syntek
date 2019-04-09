import { Token, TokenMatcher } from '../../structures';

class Comment extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Comment, /^ *#[^\r\n]+/);
