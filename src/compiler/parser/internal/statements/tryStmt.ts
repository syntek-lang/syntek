import { Node, LexicalToken, TryStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { checkVar, skipVarSize } from '../../ParseUtils';

export function tryStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after try');
  parser.consume(LexicalToken.INDENT, 'Expected indent after try');

  const tryBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    tryBody.push(parser.declaration());
  }

  parser.consume(LexicalToken.CATCH, 'Expected catch after try block');
  parser.eatWhitespace();

  const varDecl = checkVar(parser);
  if (!varDecl) {
    throw new Error('Expected variable after catch');
  }

  skipVarSize(parser, varDecl);

  parser.consume(LexicalToken.NEWLINE, 'Expected newline after catch');
  parser.syncIndentation();

  parser.consume(LexicalToken.INDENT, 'Expected indent after catch');

  const catchBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    catchBody.push(parser.declaration());
  }

  return new TryStatement(
    tryBody,
    varDecl.identifier,
    varDecl.variableType,
    catchBody,
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
