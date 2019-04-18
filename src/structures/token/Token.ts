abstract class Token {
  /**
   * The name of the token
   */
  readonly name: string = (this.constructor as any).name;

  /**
   * The starting index of the token
   */
  readonly index: number;

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
   * @param index - The starting index of the token
   * @param raw - The raw value of the token
   */
  constructor(index: number, raw: string);

  /**
   * Create a token with a list of child tokens
   * This is primarily used for parsing tokens
   *
   * @param tokens - An array with child tokens
   */
  constructor(tokens: Token[]);

  constructor(indexOrTokens: number | Token[], raw?: string) {
    if (typeof indexOrTokens === 'number') {
      this.index = indexOrTokens;
    } else {
      this.tokens = indexOrTokens;
    }

    this.raw = raw || '';
  }

  /**
   * Build the token for code generation
   */
  abstract build(): string;
}

export default Token;
