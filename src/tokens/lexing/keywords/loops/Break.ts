import { Token, TokenMatcher } from '../../../../structures/token';

export class Break extends Token {
  build(): string {
    return 'return this.break()';
  }
}

export const BreakMatcher = new TokenMatcher(Break, /^break(?!\w)/);
