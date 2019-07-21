import { Node, LexicalToken, ExpressionStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function expressionStmt(parser: Parser): Node {
  const expr = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'stmt.expression.newline_after_expression');

  parser.syncIndentation();

  return new ExpressionStatement(expr, {
    start: expr.location.start,
    end: parser.previous().location.end,
  });
}
