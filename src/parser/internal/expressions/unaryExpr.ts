import { Node, Token, UnaryExpression } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function unaryExpr(parser: Parser, operator: Token): Node {
  const right = parser.parsePrecedence(
    parser.getRule(operator.type).precedence + 1,
    `Expected an expression after '${operator.lexeme}'`,
    (error) => {
      error.info('Add an expression after this operator', operator.span);
    },
  );

  return new UnaryExpression(operator, right, new Span(operator.span.start, right.span.end));
}
