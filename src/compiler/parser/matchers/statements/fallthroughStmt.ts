import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function fallthroughStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after fallthrough');

  return new Statements.FallthroughStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
