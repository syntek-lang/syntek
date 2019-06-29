import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Multiplication
// | Division
// | Remainder

export function op8(this: ExpressionMatcher): Node {
  let expr = this.op9();

  while (this.match(
    LexicalToken.STAR,
    LexicalToken.SLASH,
    LexicalToken.PERCENT,
  )) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op9();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
