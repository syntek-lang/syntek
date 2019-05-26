import { TokenMatcher, Token } from '../../../structures/token';

export class NumberLiteral extends Token {
  build(): string {
    return `new s.NumberLiteral(${this.raw})`;
  }
}

export const NumberLiteralMatcher = new TokenMatcher(NumberLiteral, /^(0|-?[1-9][0-9]*)(\.[0-9]+)?/);
