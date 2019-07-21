import { Node, LexicalToken, ReturnStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function returnStmt(parser: Parser): Node {
  const start = parser.previous().location.start;

  let expression: Node | null = null;
  if (!parser.match(LexicalToken.NEWLINE)) {
    expression = parser.expression('stmt.return.newline_expression_after_return');
    parser.consume(LexicalToken.NEWLINE, 'stmt.return.newline_after_return_stmt');
  }

  parser.syncIndentation();

  return new ReturnStatement(expression, {
    start,
    end: parser.previous().location.end,
  });
}
