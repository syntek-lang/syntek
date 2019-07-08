type LineCol = [number, number];

export interface TokenLocation {
  start: LineCol;
  end: LineCol;
}
