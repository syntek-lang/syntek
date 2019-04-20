import { Token, TokenMatcher } from '../../../../structures/token';

export class Modulo extends Token {
  build(): string {
    return '';
  }
}

export const ModuloMatcher = new TokenMatcher(Modulo, /^%/);
