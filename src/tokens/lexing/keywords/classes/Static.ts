import { Token, TokenMatcher } from '../../../../structures/token';

export class Static extends Token {
  build(): string {
    return '';
  }
}

export const StaticMatcher = new TokenMatcher(Static, /^static(?!\w)/);
