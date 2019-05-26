import { TokenMatcher, Token } from '../../../structures/token';

export class Identifier extends Token {
  /**
   * The name of the identifier of the declaration
   */
  readonly id = this.raw;

  build(): string {
    return this.id;
  }
}

export const IdentifierMatcher = new TokenMatcher(Identifier, /^[a-zA-Z_]\w*/);
