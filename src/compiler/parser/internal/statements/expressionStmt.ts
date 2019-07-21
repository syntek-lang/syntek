import { Node, LexicalToken, ExpressionStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function expressionStmt(parser: Parser): Node {
  const expr = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'stmt.expression.newline_after_expression');

  parser.syncIndentation();

  return new ExpressionStatement(expr, new Span(expr.span.start, parser.previous().span.end));
}
