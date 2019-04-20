import { Token, TokenMatcher } from '../../../../structures/token';

export class While extends Token {
  build(): string {
    return '';
  }
}

export const WhileMatcher = new TokenMatcher(While, /^while(?!\w)/);
