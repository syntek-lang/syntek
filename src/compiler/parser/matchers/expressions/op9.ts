import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Exponentiation

export function op9(this: ExpressionMatcher): Node {
  let expr = this.op10();

  while (this.match(LexicalToken.CARET)) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op10();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
