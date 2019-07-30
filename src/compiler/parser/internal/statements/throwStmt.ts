import { Node, LexicalToken, ThrowStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

export function throwStmt(parser: Parser): Node {
  const throwSpan = parser.previous().span;

  const expression = parser.expression("Expected an expression after 'throw'", (error) => {
    error.info('Add an expression after this throw', throwSpan);
  });
  parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the throw statement', (error) => {
    error.info('Add a newline after this expression', expression.span);
  });

  parser.syncIndentation();

  return new ThrowStatement(expression, new Span(throwSpan.start, parser.previous().span.end));
}
