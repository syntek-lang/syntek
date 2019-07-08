import { Node, LexicalToken, TryStatement } from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function tryStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after try');
  parser.consume(LexicalToken.INDENT, 'Expected indent after try');

  const tryBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    tryBody.push(parser.declaration());
  }

  parser.consume(LexicalToken.CATCH, 'Expected catch after try block');

  const typeDeclReport = ParseUtils.matchTypeDecl(parser);

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after catch');
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after catch');
  parser.consume(LexicalToken.INDENT, 'Expected indent after catch');

  const catchBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    catchBody.push(parser.declaration());
  }

  return new TryStatement(
    tryBody,
    identifier,
    typeDeclReport.variableType,
    catchBody,
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
