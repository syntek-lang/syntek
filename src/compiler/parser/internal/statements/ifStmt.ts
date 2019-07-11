import {
  Node, LexicalToken, IfStatement, ElseStatement,
} from '../../../../grammar';

import { Parser } from '../../..';

function elseStmt(parser: Parser): Node {
  const start = parser.previous().location.start;

  parser.consume(LexicalToken.NEWLINE, 'Expected newline after else');
  parser.consume(LexicalToken.INDENT, 'Expected indent after else');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ElseStatement(body, {
    start,
    end: parser.previous().location.end,
  });
}

export function ifStmt(parser: Parser): Node {
  const start = parser.previous().location.start;
  parser.eatWhitespace();

  const condition = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after if');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected indent after if');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  let elseClause: Node | null = null;
  if (parser.match(LexicalToken.ELSE)) {
    if (parser.match(LexicalToken.IF)) {
      elseClause = ifStmt(parser);
    } else {
      elseClause = elseStmt(parser);
    }
  }

  return new IfStatement(condition, body, elseClause, {
    start,
    end: parser.previous().location.end,
  });
}
