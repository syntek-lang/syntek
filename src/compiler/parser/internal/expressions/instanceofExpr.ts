import { Node, Token, InstanceofExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function instanceofExpr(parser: Parser, left: Node, operator: Token): Node {
  parser.eatWhitespace();

  const rule = parser.getRule(operator.type);
  const right = parser.parsePrecedence(rule.precedence + 1, 'Expected expression after "instanceof"');

  return new InstanceofExpression(left, right, {
    start: left.location.start,
    end: right.location.end,
  });
}
