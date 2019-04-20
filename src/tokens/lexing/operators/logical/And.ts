import { Token, TokenMatcher } from '../../../../structures/token';

export class And extends Token {
  build(): string {
    return '';
  }
}

export const AndMatcher = new TokenMatcher(And, /^and(?!\w)/);
