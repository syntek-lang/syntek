import { Token, TokenMatcher } from '../../../../structures/token';

export class IsGreaterThan extends Token {
  build(): string {
    return '';
  }
}

export const IsGreaterThanMatcher = new TokenMatcher(IsGreaterThan, /^is greater than(?!\w)/);
