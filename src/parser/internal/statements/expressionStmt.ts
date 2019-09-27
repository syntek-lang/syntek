import { Node, ExpressionStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function expressionStmt(parser: Parser): Node {
  const expr = parser.expression();

  return new ExpressionStatement(expr, new Span(expr.span.start, parser.previous().span.end));
}
