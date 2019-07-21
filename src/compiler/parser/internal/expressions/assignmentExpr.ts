import { Node, AssignmentExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function assignmentExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const value = parser.expression('expr.assignment.expression_after_equal');

  return new AssignmentExpression(left, value, new Span(left.span.start, value.span.end));
}
