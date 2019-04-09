abstract class Token {
  readonly name = (this.constructor as any).name;

  readonly index: number;

  readonly raw: string;

  constructor(index: number, raw: string) {
    this.index = index;
    this.raw = raw;
  }

  abstract build(): string;
}

export default Token;
