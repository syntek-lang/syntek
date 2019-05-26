import { Token, TokenMatcher } from '../../../../structures/token';

export class BooleanKeyword extends Token {
  build(): string {
    return 's.BooleanLiteral';
  }
}

export const BooleanKeywordMatcher = new TokenMatcher(BooleanKeyword, /^boolean(?!\w)/);
