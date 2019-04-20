import { Token, TokenMatcher } from '../../../structures/token';

export class Lbra extends Token {
  build(): string {
    return '';
  }
}

export const LbraMatcher = new TokenMatcher(Lbra, /^\[/);
