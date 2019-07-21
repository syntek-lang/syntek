import { Node, LexicalToken, ThrowStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function throwStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  const expression = parser.expression('stmt.throw.expression_after_throw');
  parser.consume(LexicalToken.NEWLINE, 'stmt.throw.newline_after_throw_stmt');

  parser.syncIndentation();

  return new ThrowStatement(expression, new Span(start, parser.previous().span.end));
}
