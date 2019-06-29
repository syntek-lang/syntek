import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | Unary Expression
// | TODO: Async Expression

export function op10(this: ExpressionMatcher): Node {
  if (this.match(
    LexicalToken.MINUS,
    LexicalToken.PLUS,
    LexicalToken.NOT,
  )) {
    const operator = this.previous();
    const right = this.op11();

    return new Expressions.UnaryExpression(operator, right, {
      start: operator.location.start,
      end: right.location.end,
    });
  }

  return this.op11();
}
