import { Node, LexicalToken, ExpressionStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function expressionStmt(parser: Parser): Node {
  const expr = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after expression');

  parser.syncIndentation();

  return new ExpressionStatement(expr, {
    start: expr.location.start,
    end: parser.previous().location.end,
  });
}
