import { Node, BreakStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function breakStmt(parser: Parser): Node {
  return new BreakStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
