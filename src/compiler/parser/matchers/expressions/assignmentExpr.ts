import { Node, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function assignmentExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const value = this.expression();

  return new Expressions.AssignmentExpression(left, value, {
    start: left.location.start,
    end: value.location.end,
  });
}
