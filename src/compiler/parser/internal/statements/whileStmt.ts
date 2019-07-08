import { Node, LexicalToken, WhileStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function whileStmt(parser: Parser): Node {
  const start = parser.previous().location.start;

  const condition = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after while');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after while');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new WhileStatement(condition, body, {
    start,
    end: parser.previous().location.end,
  });
}
