import { Node, LexicalToken, FallthroughStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function fallthroughStmt(parser: Parser): Node {
  parser.consume(LexicalToken.NEWLINE, "Expected a newline after 'fallthrough'", (error) => {
    error.info('Add a newline after this fallthrough', parser.previous().span);
  });

  return new FallthroughStatement(new Span(
    parser.previous().span.start,
    parser.previous().span.end,
  ));
}
