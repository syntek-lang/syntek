import { Token, TokenMatcher } from '../../../structures/token';

export class Emptyline extends Token {
  build(): string {
    return '';
  }
}

export const EmptylineMatcher = new TokenMatcher(Emptyline, /^\s+$/m);
