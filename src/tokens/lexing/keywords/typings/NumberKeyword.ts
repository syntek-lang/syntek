import { Token, TokenMatcher } from '../../../../structures/token';

export class NumberKeyword extends Token {
  build(): string {
    return 's.NumberLiteral';
  }
}

export const NumberKeywordMatcher = new TokenMatcher(NumberKeyword, /^number(?!\w)/);
