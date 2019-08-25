import {
  Node, LexicalToken, IfStatement, ElseStatement,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function ifStmt(parser: Parser): Node {
  const ifSpan = parser.previous().span;
  parser.eatWhitespace();

  const condition = parser.expression("Expected a condition after 'if'", (error) => {
    error.info('Add an expression after this if', ifSpan);
  });

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the if statement', (error) => {
    error.info('Add a newline after the condition', condition.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the if statement', (error) => {
    error.info('Add an indent after the condition', condition.span);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  let elseClause: Node | null = null;
  if (parser.match(LexicalToken.ELSE)) {
    if (parser.match(LexicalToken.IF)) {
      elseClause = ifStmt(parser);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      elseClause = elseStmt(parser);
    }
  }

  return new IfStatement(
    condition,
    body,
    elseClause,
    new Span(ifSpan.start, parser.previous().span.end),
  );
}

function elseStmt(parser: Parser): Node {
  const elseSpan = parser.previous().span;

  parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after 'else'", (error) => {
    error.info('Add a newline after this else', elseSpan);
  });
  parser.consume(LexicalToken.INDENT, "Expected a newline and indent after 'else'", (error) => {
    error.info('Add an indent after this else', elseSpan);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ElseStatement(body, new Span(elseSpan.start, parser.previous().span.end));
}
