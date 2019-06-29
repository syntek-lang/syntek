import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | or

export function op3(this: ExpressionMatcher): Node {
  let expr = this.op4();

  while (this.match(LexicalToken.OR)) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op4();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
