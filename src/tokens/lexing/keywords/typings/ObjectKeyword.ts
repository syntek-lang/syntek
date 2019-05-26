import { Token, TokenMatcher } from '../../../../structures/token';

export class ObjectKeyword extends Token {
  build(): string {
    return 's.ObjectStruct';
  }
}

export const ObjectKeywordMatcher = new TokenMatcher(ObjectKeyword, /^object(?!\w)/);
