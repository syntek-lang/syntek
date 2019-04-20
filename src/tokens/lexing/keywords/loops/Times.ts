import { Token, TokenMatcher } from '../../../../structures/token';

export class Times extends Token {
  build(): string {
    return '';
  }
}

export const TimesMatcher = new TokenMatcher(Times, /^times(?!\w)/);
