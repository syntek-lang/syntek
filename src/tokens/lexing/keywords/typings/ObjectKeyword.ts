import { Token, TokenMatcher } from '../../../../structures/token';

export class ObjectKeyword extends Token {
  build(): string {
    return '';
  }
}

export const ObjectKeywordMatcher = new TokenMatcher(ObjectKeyword, /^object(?!\w)/);
