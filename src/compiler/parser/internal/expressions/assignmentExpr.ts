import { Node, AssignmentExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function assignmentExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const value = parser.expression();

  return new AssignmentExpression(left, value, {
    start: left.location.start,
    end: value.location.end,
  });
}
