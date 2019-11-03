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
    let startsAfter: boolean;
    if (span.start[0] > this.start[0]) {
      startsAfter = true;
    } else if (span.start[0] === this.start[0]) {
      startsAfter = span.start[1] >= this.start[1];
    } else {
      startsAfter = false;
    }

    let endsBefore: boolean;
    if (this.end[0] > span.end[0]) {
      endsBefore = true;
    } else if (this.end[0] === span.end[0]) {
      endsBefore = this.end[1] >= span.end[1];
    } else {
      endsBefore = false;
    }

    return startsAfter && endsBefore;
  }
}
