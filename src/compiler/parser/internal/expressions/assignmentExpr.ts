import { Node, AssignmentExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function assignmentExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const value = parser.expression('Expected expression after "="');

  return new AssignmentExpression(left, value, {
    start: left.location.start,
    end: value.location.end,
  });
}
