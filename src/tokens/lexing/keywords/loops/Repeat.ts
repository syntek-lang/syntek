import { Token, TokenMatcher } from '../../../../structures/token';

export class Repeat extends Token {
  build(): string {
    return '';
  }
}

export const RepeatMatcher = new TokenMatcher(Repeat, /^repeat(?!\w)/);
