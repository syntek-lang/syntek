import { Token, TokenMatcher } from '../../../../structures/token';

export class BooleanKeyword extends Token {
  build(): string {
    return '';
  }
}

export const BooleanKeywordMatcher = new TokenMatcher(BooleanKeyword, /^boolean(?!\w)/);
