import { Token, TokenMatcher } from '../../../../structures/token';

export class Else extends Token {
  build(): string {
    return '';
  }
}

export const ElseMatcher = new TokenMatcher(Else, /^else(?!\w)/);
