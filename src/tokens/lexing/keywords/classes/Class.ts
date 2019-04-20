import { Token, TokenMatcher } from '../../../../structures/token';

export class Class extends Token {
  build(): string {
    return '';
  }
}

export const ClassMatcher = new TokenMatcher(Class, /^class(?!\w)/);
