import { Token, TokenMatcher } from '../../../../structures/token';

export class In extends Token {
  build(): string {
    return '';
  }
}

export const InMatcher = new TokenMatcher(In, /^in(?!\w)/);
