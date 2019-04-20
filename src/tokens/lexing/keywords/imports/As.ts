import { Token, TokenMatcher } from '../../../../structures/token';

export class As extends Token {
  build(): string {
    return '';
  }
}

export const AsMatcher = new TokenMatcher(As, /^as(?!\w)/);
