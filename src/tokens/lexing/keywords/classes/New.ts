import { Token, TokenMatcher } from '../../../../structures/token';

export class New extends Token {
  build(): string {
    return '';
  }
}

export const NewMatcher = new TokenMatcher(New, /^new(?!\w)/);
