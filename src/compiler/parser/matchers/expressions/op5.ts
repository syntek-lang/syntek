import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | is
// | is not

export function op5(this: ExpressionMatcher): Node {
  let expr = this.op6();

  while (this.peek().type === LexicalToken.IS && !this.isComparisonToken(this.peek(1))) {
    let operator = this.advance();

    if (this.peek().type === LexicalToken.NOT) {
      operator = this.advance();
    }

    this.eatWhitespace();
    const right = this.op6();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
