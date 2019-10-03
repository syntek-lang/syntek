import { Node, YieldStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function yieldStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  parser.ignoreNewline();

  const expression = parser.expression("Expected an expression after 'yield'", (error) => {
    error.info('Add an expression after this yield', parser.previous().span);
  });

  return new YieldStatement(expression, new Span(start, parser.previous().span.end));
}
