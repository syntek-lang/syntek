import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Addition
// | Subtraction

export function op7(this: ExpressionMatcher): Node {
  let expr = this.op8();

  while (this.match(
    LexicalToken.PLUS,
    LexicalToken.MINUS,
  )) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op8();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
