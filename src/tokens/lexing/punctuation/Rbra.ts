import { Token, TokenMatcher } from '../../../structures/token';

export class Rbra extends Token {
  build(): string {
    return '';
  }
}

export const RbraMatcher = new TokenMatcher(Rbra, /^\]/);
