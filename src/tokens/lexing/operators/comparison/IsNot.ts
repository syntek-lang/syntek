import { Token, TokenMatcher } from '../../../../structures/token';

export class IsNot extends Token {
  build(): string {
    return '';
  }
}

export const IsNotMatcher = new TokenMatcher(IsNot, /^is not(?!\w)/);
