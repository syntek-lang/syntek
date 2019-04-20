import { Token, TokenMatcher } from '../../../structures/token';

export class Space extends Token {
  build(): string {
    return '';
  }
}

export const SpaceMatcher = new TokenMatcher(Space, /^ +/);
