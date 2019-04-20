import { Token, TokenMatcher } from '../../../../structures/token';

export class NumberKeyword extends Token {
  build(): string {
    return '';
  }
}

export const NumberKeywordMatcher = new TokenMatcher(NumberKeyword, /^number(?!\w)/);
