import { Node, ReturnStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function returnStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  let expression: Node | null = null;
  if (!parser.isEOL()) {
    expression = parser.expression("Expected a newline or expression after 'return'", (error) => {
      error.info('Add a newline or expression after this return', parser.previous().span);
    });
  }

  return new ReturnStatement(expression, new Span(start, parser.previous().span.end));
}
