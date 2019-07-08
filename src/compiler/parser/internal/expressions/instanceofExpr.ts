import { Node, Token, InstanceofExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function instanceofExpr(this: Parser, left: Node, operator: Token): Node {
  this.eatWhitespace();

  const rule = this.getRule(operator.type);
  const right = this.parsePrecedence(rule.precedence + 1);

  return new InstanceofExpression(left, right, {
    start: left.location.start,
    end: right.location.end,
  });
}
