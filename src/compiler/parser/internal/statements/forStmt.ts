import { Node, LexicalToken, ForStatement } from '../../../../grammar';

import { Parser } from '../../..';
import { checkVar, skipVarSize } from '../../ParseUtils';

export function forStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const varDecl = checkVar(parser);
  if (!varDecl) {
    throw parser.error(parser.peek(), 'Expected variable after for');
  }

  skipVarSize(parser, varDecl);

  parser.eatWhitespace();
  parser.consume(LexicalToken.IN, 'Expected "in" after identifier');

  parser.eatWhitespace();
  const object = parser.expression('Expected expression after "in"');
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after for statement');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after for statement');

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
