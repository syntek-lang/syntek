import { Node, Token, AssignmentExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function assignmentExpr(parser: Parser, left: Node, operator: Token): Node {
  const value = parser.expression("Expected an expression after '='", (error) => {
    error.info('Add an expression after this =', operator.span);
  });

  return new AssignmentExpression(left, value, new Span(left.span.start, value.span.end));
}
