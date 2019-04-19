import Location from './Location';

abstract class Token {
  /**
   * The name of the token
   */
  readonly name: string = (this.constructor as any).name;

  /**
   * The location of the token token
   */
  readonly location: Location;

  /**
   * The raw content of the token
   */
  readonly raw: string;

  /**
   * The child tokens of the token
   */
  readonly tokens: Token[];

  /**
   * Create a new token with an index and raw content
   * This is primarily used for lexing tokens
   *
   * @param location - The location of the token
   * @param raw - The raw value of the token
   */
  constructor(location: Location, raw: string);

  /**
   * Create a token with a list of child tokens
   * This is primarily used for parsing tokens
   *
   * @param location - The location of the token
   * @param tokens - An array with child tokens
   */
  constructor(location: Location, tokens: Token[]);

  constructor(location: Location, rawOrTokens: string | Token[]) {
    this.location = location;

    if (typeof rawOrTokens === 'string') {
      this.raw = rawOrTokens;
    } else {
      this.tokens = rawOrTokens;
    }
  }

  /**
   * Build the token for code generation
   */
  abstract build(): string;
}

export default Token;
