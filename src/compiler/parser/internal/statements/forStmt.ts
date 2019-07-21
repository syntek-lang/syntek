import { Node, LexicalToken, ForStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { checkVar, skipVarSize } from '../../parse-utils';

export function forStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const varDecl = checkVar(parser);
  if (!varDecl) {
    throw parser.error(parser.peek(), 'stmt.for.variable_after_for');
  }

  skipVarSize(parser, varDecl);

  parser.eatWhitespace();
  parser.consume(LexicalToken.IN, 'stmt.for.in_after_variable');

  parser.eatWhitespace();
  const object = parser.expression('stmt.for.expression_after_in');
  parser.consume(LexicalToken.NEWLINE, 'stmt.for.newline_indent_after_for_stmt');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'stmt.for.newline_indent_after_for_stmt');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ForStatement(
    varDecl.identifier,
    varDecl.variableType,
    object,
    body,
    {
      start,
      end: parser.previous().location.end,
    },
  );
}
