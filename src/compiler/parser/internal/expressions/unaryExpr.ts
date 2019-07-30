import { Node, Token, UnaryExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { Precedence } from '../../Precedence';

export function unaryExpr(parser: Parser, operator: Token): Node {
  parser.eatWhitespace();

  const right = parser.parsePrecedence(
    Precedence.OP10,
    `Expected an expression after '${operator.lexeme}'`,
    (error) => {
      error.info('Add an expression after this operator', operator.span);
    },
  );

  return new UnaryExpression(operator, right, new Span(operator.span.start, right.span.end));
}
