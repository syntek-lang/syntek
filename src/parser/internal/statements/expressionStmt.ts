import { Node, LexicalToken, ExpressionStatement } from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function expressionStmt(parser: Parser): Node {
  const expr = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the expression', (error) => {
    error.info('Add a newline at the end of this expression', expr.span);
  });

  parser.syncIndentation();

  return new ExpressionStatement(expr, new Span(expr.span.start, parser.previous().span.end));
}
