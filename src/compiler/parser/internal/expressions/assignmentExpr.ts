import { Node, AssignmentExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function assignmentExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const value = this.expression();

  return new AssignmentExpression(left, value, {
    start: left.location.start,
    end: value.location.end,
  });
}
