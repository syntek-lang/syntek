import { Token, TokenMatcher } from '../../../../structures/token';

export class Minus extends Token {
  build(): string {
    return '';
  }
}

export const MinusMatcher = new TokenMatcher(Minus, /^-/);
