import { Node, LexicalToken, IndexExpression } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function indexExpr(parser: Parser, left: Node): Node {
  parser.eatWhitespace();
  const expr = parser.expression("Expected an expression after '['", (error) => {
    error.info('Add an expression after this [', left.span);
  });

  parser.eatWhitespace();
  parser.consume(LexicalToken.RSQB, "Expected ']' after the expression", (error) => {
    error.info("Add a ']' after this expression", expr.span);
  });

  return new IndexExpression(left, expr, new Span(left.span.start, parser.previous().span.end));
}
