import { Node, LexicalToken, FallthroughStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function fallthroughStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, 'stmt.fallthrough.newline_after_fallthrough');

  return new FallthroughStatement(new Span(
    parser.previous().span.start,
    parser.previous().span.end,
  ));
}
