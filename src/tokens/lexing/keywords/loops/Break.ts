import { Token, TokenMatcher } from '../../../../structures/token';

export class Break extends Token {
  build(): string {
    return '';
  }
}

export const BreakMatcher = new TokenMatcher(Break, /^break(?!\w)/);
