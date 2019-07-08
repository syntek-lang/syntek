import { Node, LexicalToken, ThrowStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function throwStmt(parser: Parser): Node {
  const start = parser.previous().location.start;

  const expression = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after throw statement');

  parser.syncIndentation();

  return new ThrowStatement(expression, {
    start,
    end: parser.previous().location.end,
  });
}
