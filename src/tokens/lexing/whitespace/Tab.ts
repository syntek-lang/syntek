import { Token, TokenMatcher } from '../../../structures/token';

export class Tab extends Token {
  build(): string {
    return '';
  }
}

export const TabMatcher = new TokenMatcher(Tab, /^\t/);
