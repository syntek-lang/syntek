abstract class Token {
  readonly name = (this.constructor as any).name;

  readonly index: number;

  readonly raw: string;

  readonly tokens: Token | Token[];

  constructor(index: number, raw: string);

  constructor(index: number, tokens: Token | Token[]);

  constructor(index: number, content: string | Token | Token[]) {
    this.index = index;

    if (typeof content === 'string') {
      this.raw = content;
    } else {
      this.tokens = content;
    }
  }

  abstract build(): string;
}

export default Token;
