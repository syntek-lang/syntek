import { Token, TokenMatcher } from '../../../structures/token';

export class Newline extends Token {
  build(): string {
    return '';
  }
}

export const NewlineMatcher = new TokenMatcher(Newline, /^\r?\n/);
