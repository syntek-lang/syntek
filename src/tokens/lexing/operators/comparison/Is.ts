import { Token, TokenMatcher } from '../../../../structures/token';

export class Is extends Token {
  build(): string {
    return '';
  }
}

export const IsMatcher = new TokenMatcher(Is, /^is(?!\w)/);
