import { Node, Token, InstanceofExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function instanceofExpr(parser: Parser, left: Node, operator: Token): Node {
  const right = parser.parsePrecedence(
    parser.getRule(operator.type).precedence + 1,
    "Expected an expression after 'instanceof'",
    (error) => {
      error.info('Add an expression after this instanceof', operator.span);
    },
  );

  return new InstanceofExpression(left, right, new Span(left.span.start, right.span.end));
}
