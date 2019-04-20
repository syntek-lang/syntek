import { Token, TokenMatcher } from '../../../../structures/token';

export class Or extends Token {
  build(): string {
    return '';
  }
}

export const OrMatcher = new TokenMatcher(Or, /^or(?!\w)/);
