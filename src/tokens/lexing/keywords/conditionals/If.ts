import { Token, TokenMatcher } from '../../../../structures/token';

export class If extends Token {
  build(): string {
    return '';
  }
}

export const IfMatcher = new TokenMatcher(If, /^if(?!\w)/);
