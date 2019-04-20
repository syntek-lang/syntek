import { Token, TokenMatcher } from '../../../../structures/token';

export class Import extends Token {
  build(): string {
    return '';
  }
}

export const ImportMatcher = new TokenMatcher(Import, /^import(?!\w)/);
