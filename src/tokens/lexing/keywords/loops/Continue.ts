import { Token, TokenMatcher } from '../../../../structures/token';

export class Continue extends Token {
  build(): string {
    return '';
  }
}

export const ContinueMatcher = new TokenMatcher(Continue, /^continue(?!\w)/);
