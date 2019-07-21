import { Node, LexicalToken, TryStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { checkVar, skipVarSize } from '../../parse-utils';

export function tryStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.consume(LexicalToken.NEWLINE, 'stmt.try.newline_indent_after_try');
  parser.consume(LexicalToken.INDENT, 'stmt.try.newline_indent_after_try');

  const tryBody: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    tryBody.push(parser.declaration());
  }

  parser.consume(LexicalToken.CATCH, 'stmt.try.catch_after_try_block');
  parser.eatWhitespace();

  const varDecl = checkVar(parser);
  if (!varDecl) {
    throw parser.error(parser.peek(), 'stmt.try.variable_after_catch');
  }

  skipVarSize(parser, varDecl);

  parser.consume(LexicalToken.NEWLINE, 'stmt.try.newline_indent_after_catch');
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'stmt.try.newline_indent_after_catch');

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
