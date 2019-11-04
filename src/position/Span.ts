type LineColumn = [number, number];

export class Span {
  readonly start: LineColumn;

  readonly end: LineColumn;

  constructor(start: LineColumn, end: LineColumn) {
    this.start = start;
    this.end = end;
  }

  before(span: Span): boolean {
    // Line above
    if (this.end[0] < span.start[0]) {
      return true;
    }

    // Same line
    if (this.end[0] === span.start[0]) {
      // Ends before the span starts
      return this.end[1] < span.start[1];
    }

    // Line below
    return false;
  }

  after(span: Span): boolean {
    // Line below
    if (this.start[0] > span.end[0]) {
      return true;
    }

    // Same line
    if (this.start[0] === span.end[0]) {
      // Starts after the span ends
      return this.start[1] > span.end[1];
    }

    // Line above
    return false;
  }

  contains(span: Span): boolean {
    return !this.before(span) && !this.after(span);
  }
}
