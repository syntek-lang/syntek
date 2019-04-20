import { Token, TokenMatcher } from '../../../../structures/token';

export class Slash extends Token {
  build(): string {
    return '';
  }
}

export const SlashMatcher = new TokenMatcher(Slash, /^\//);
