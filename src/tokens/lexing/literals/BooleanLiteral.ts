import { TokenMatcher, Token } from '../../../structures/token';

export class BooleanLiteral extends Token {
  build(): string {
    return `new s.BooleanLiteral(${this.raw})`;
  }
}

export const BooleanLiteralMatcher = new TokenMatcher(BooleanLiteral, /^(true|false)(?!\w)/);
