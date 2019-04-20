import { Token, TokenMatcher } from '../../../../structures/token';

export class For extends Token {
  build(): string {
    return '';
  }
}

export const ForMatcher = new TokenMatcher(For, /^for(?!\w)/);
