import { Node, LexicalToken, Expressions } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | is less than
// | is greater than
// | Instanceof Expression

export function op6(this: ExpressionMatcher): Node {
  let expr = this.op7();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (this.peek().type === LexicalToken.IS && this.isComparisonToken(this.peek(1))) {
      // less or greater than found
      this.advance();

      const operator = this.advance();
      this.consume(LexicalToken.THAN, `Expected "than" after "${operator.lexeme}"`);

      this.eatWhitespace();
      const right = this.op7();

      expr = new Expressions.BinaryExpression(expr, operator, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    } else if (this.match(LexicalToken.INSTANCEOF)) {
      // instanceof found
      this.eatWhitespace();
      const right = this.op7();

      expr = new Expressions.InstanceofExpression(expr, right, {
        start: expr.location.start,
        end: right.location.end,
      });
    } else {
      // Neither was found
      break;
    }
  }

  return expr;
}
