import { Token, TokenMatcher } from '../../../../structures/token';

export class Return extends Token {
  build(): string {
    return '';
  }
}

export const ReturnMatcher = new TokenMatcher(Return, /^return(?!\w)/);
