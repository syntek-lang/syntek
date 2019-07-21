type LineColumn = [number, number];

export class Span {
  readonly start: LineColumn;

  readonly end: LineColumn;

  constructor(start: LineColumn, end: LineColumn) {
    this.start = start;
    this.end = end;
  }
}
