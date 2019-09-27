import { Node, ContinueStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function continueStmt(parser: Parser): Node {
  return new ContinueStatement(new Span(parser.previous().span.start, parser.previous().span.end));
}
