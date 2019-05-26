import { TokenMatcher, Token } from '../../../structures/token';

export class StringLiteral extends Token {
  build(): string {
    return `new s.StringLiteral(${this.raw})`;
  }
}

export const StringLiteralMatcher = new TokenMatcher(StringLiteral, /^'(?:[^'\\]|\\.)*'/);
