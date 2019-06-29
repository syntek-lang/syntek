import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | and

export function op4(this: ExpressionMatcher): Node {
  let expr = this.op5();

  while (this.match(LexicalToken.AND)) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op5();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
