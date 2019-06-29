import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Unary Expression
// | Async Expression

export function op10(this: ExpressionMatcher): Node {
  // Unary
  if (this.match(
    LexicalToken.MINUS,
    LexicalToken.PLUS,
    LexicalToken.NOT,
  )) {
    const operator = this.previous();
    this.eatWhitespace();
    const right = this.op11();

    return new Expressions.UnaryExpression(operator, right, {
      start: operator.location.start,
      end: right.location.end,
    });
  }

  // Async
  if (this.match(LexicalToken.ASYNC)) {
    this.eatWhitespace();
    const expr = this.op11();

    return new Expressions.AsyncExpression(expr, expr.location);
  }

  return this.op11();
}
