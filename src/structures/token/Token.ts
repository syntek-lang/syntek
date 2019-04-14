abstract class Token {
  readonly name = (this.constructor as any).name;

  readonly index: number;

  readonly raw: string;

  readonly tokens: Token | Token[];

  constructor(index: number, raw: string);

  constructor(tokens: Token | Token[]);

  constructor(indexOrTokens: number | Token | Token[], raw?: string) {
    if (typeof indexOrTokens === 'number') {
      this.index = indexOrTokens;
    } else {
      this.tokens = indexOrTokens;
    }

    this.raw = raw || '';
  }

  abstract build(): string;
}

export default Token;
