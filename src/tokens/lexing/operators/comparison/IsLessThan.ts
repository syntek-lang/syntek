import { Token, TokenMatcher } from '../../../../structures/token';

export class IsLessThan extends Token {
  build(): string {
    return '';
  }
}

export const IsLessThanMatcher = new TokenMatcher(IsLessThan, /^is less than(?!\w)/);
