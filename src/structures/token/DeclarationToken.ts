import Token from './Token';

abstract class DeclarationToken extends Token {
  /**
   * The identifier token of the declaration
   */
  readonly identifier: Token;

  /**
   * The name of the identifier of the declaration
   */
  readonly id: string;

  constructor(identifier: Token, location, matchedTokens) {
    super(location, matchedTokens);

    this.identifier = identifier;
    this.id = identifier.raw;
  }
}

export default DeclarationToken;
