import { Token, TokenMatcher } from '../../../../structures/token';

export class ElseIf extends Token {
  build(): string {
    return '';
  }
}

export const ElseIfMatcher = new TokenMatcher(ElseIf, /^else if(?!\w)/);
