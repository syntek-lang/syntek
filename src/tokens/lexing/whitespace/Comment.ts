import { Token, TokenMatcher } from '../../../structures/token';

export class Comment extends Token {
  build(): string {
    return '';
  }
}

export const CommentMatcher = new TokenMatcher(Comment, /^ *#[^\r\n]*/);
