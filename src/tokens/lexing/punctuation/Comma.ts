import { Token, TokenMatcher } from '../../../structures/token';

export class Comma extends Token {
  build(): string {
    return '';
  }
}

export const CommaMatcher = new TokenMatcher(Comma, /^,/);
