import { Token, TokenMatcher } from '../../../../structures/token';

export class Plus extends Token {
  build(): string {
    return '';
  }
}

export const PlusMatcher = new TokenMatcher(Plus, /^\+/);
