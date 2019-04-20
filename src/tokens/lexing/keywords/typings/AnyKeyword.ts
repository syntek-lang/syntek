import { Token, TokenMatcher } from '../../../../structures/token';

export class AnyKeyword extends Token {
  build(): string {
    return '';
  }
}

export const AnyKeywordMatcher = new TokenMatcher(AnyKeyword, /^any(?!\w)/);
