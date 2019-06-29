import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | is less than
// | is greater than
// | TODO: Instanceof Expression

export function op6(this: ExpressionMatcher): Node {
  let expr = this.op7();

  while (this.peek().type === LexicalToken.IS && this.isComparisonToken(this.peek(1))) {
    this.advance();

    const operator = this.advance();
    this.consume(LexicalToken.THAN, `Expected "than" after "${operator.lexeme}"`);

    this.eatWhitespace();
    const right = this.op7();

    expr = new Expressions.BinaryExpression(expr, operator, right, {
      start: expr.location.start,
      end: right.location.end,
    });
  }

  return expr;
}
