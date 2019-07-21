import {
  Node, LexicalToken, IfStatement, ElseStatement,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';

function elseStmt(parser: Parser): Node {
  const start = parser.previous().span.start;

  parser.consume(LexicalToken.NEWLINE, 'stmt.if.newline_indent_after_else');
  parser.consume(LexicalToken.INDENT, 'stmt.if.newline_indent_after_else');

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ElseStatement(body, {
    start,
    end: parser.previous().span.end,
  });
}

export function ifStmt(parser: Parser): Node {
  const start = parser.previous().span.start;
  parser.eatWhitespace();

  const condition = parser.expression('stmt.if.expression_after_if');
  parser.consume(LexicalToken.NEWLINE, 'stmt.if.newline_indent_after_if_stmt');

  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'stmt.if.newline_indent_after_if_stmt');

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

  return new IfStatement(condition, body, elseClause, new Span(start, parser.previous().span.end));
}
