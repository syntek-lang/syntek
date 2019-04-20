import { Token, TokenMatcher } from '../../../../structures/token';

export class Not extends Token {
  build(): string {
    return '';
  }
}

export const NotMatcher = new TokenMatcher(Not, /^not(?!\w)/);
