import { Token, TokenMatcher } from '../../../../structures/token';

export class StringKeyword extends Token {
  build(): string {
    return 's.StringLiteral';
  }
}

export const StringKeywordMatcher = new TokenMatcher(StringKeyword, /^string(?!\w)/);
