import { Token, TokenMatcher } from '../../../../structures/token';

export class Returns extends Token {
  build(): string {
    return '';
  }
}

export const ReturnsMatcher = new TokenMatcher(Returns, /^returns(?!\w)/);
