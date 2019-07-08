import { Node, LexicalToken, FallthroughStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function fallthroughStmt(this: Parser): Node {
  this.consume(LexicalToken.NEWLINE, 'Expected newline after fallthrough');

  return new FallthroughStatement({
    start: this.previous().location.start,
    end: this.previous().location.end,
  });
}
