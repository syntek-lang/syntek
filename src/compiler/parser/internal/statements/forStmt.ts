import { Node, LexicalToken, ForStatement } from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function forStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  const typeDeclReport = ParseUtils.matchTypeDecl(parser);

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after for');
  parser.consume(LexicalToken.IN, 'Expected "in" after identifier');

  const object = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after for statement');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after for statement');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ForStatement(
    identifier,
    typeDeclReport.variableType,
    object,
    body,
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
