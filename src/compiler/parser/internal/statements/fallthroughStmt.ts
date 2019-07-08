import { Node, LexicalToken, FallthroughStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function fallthroughStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after fallthrough');

  return new FallthroughStatement({
    start: parser.previous().location.start,
    end: parser.previous().location.end,
  });
}
