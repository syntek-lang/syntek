import {
  Node, Token, LexicalToken, BinaryExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function binaryExpr(parser: Parser, left: Node, operator: Token): Node {
  parser.eatWhitespace();

  const rule = parser.getRule(operator.type);
  const exponentation = operator.type === LexicalToken.CARET;

  // Exponentation is right-associative
  const right = parser.parsePrecedence(
    rule.precedence + (exponentation ? 0 : 1),
    'expr.binary.expression_after_operator',
  );

  return new BinaryExpression(left, operator, right, {
    start: left.location.start,
    end: right.location.end,
  });
}
