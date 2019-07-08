import {
  Node, Token, LexicalToken, BinaryExpression,
} from '../../../../grammar';

import { Parser } from '../../..';

export function binaryExpr(this: Parser, left: Node, operator: Token): Node {
  this.eatWhitespace();

  const rule = this.getRule(operator.type);
  const exponentation = operator.type === LexicalToken.CARET;

  // Exponentation is right-associative
  const right = this.parsePrecedence(rule.precedence + (exponentation ? 0 : 1));

  return new BinaryExpression(left, operator, right, {
    start: left.location.start,
    end: right.location.end,
  });
}
