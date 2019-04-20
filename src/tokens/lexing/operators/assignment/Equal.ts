import { Token, TokenMatcher } from '../../../../structures/token';

export class Equal extends Token {
  build(): string {
    return '';
  }
}

export const EqualMatcher = new TokenMatcher(Equal, /^=/);
