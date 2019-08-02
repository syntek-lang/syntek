import {
  Node, LexicalToken, TryStatement, CatchStatement,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { checkVar, skipVarSize } from '../../parse-utils';

export function tryStmt(parser: Parser): Node {
  const trySpan = parser.previous().span;

  parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after 'try'", (error) => {
    error.info('Add a newline after this try', trySpan);
  });
  parser.consume(LexicalToken.INDENT, "Expected a newline and indent after 'try'", (error) => {
    error.info('Add an indent after this try', trySpan);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  const span = new Span(trySpan.start, parser.previous().span.end);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const catchStatement = catchStmt(parser);

  return new TryStatement(body, catchStatement, span);
}

function catchStmt(parser: Parser): CatchStatement {
  const catchSpan = parser.consume(LexicalToken.CATCH, "Expected 'catch' after the try block", (error) => {
    error.info('Add catch of the try block', parser.previous().span);
  }).span;
  parser.eatWhitespace();

  const varDecl = checkVar(parser);
  if (!varDecl) {
    throw parser.error("Expected a variable after 'catch'", parser.peek().span, (error) => {
      error.info('Add a variable after this catch', catchSpan);
    });
  }

  skipVarSize(parser, varDecl);

  parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after 'catch'", (error) => {
    error.info('Add a newline after the variable', varDecl.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, "Expected a newline and indent after 'catch'", (error) => {
    error.info('Add an indent after the variable', varDecl.span);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new CatchStatement(
    varDecl.identifier,
    varDecl.variableType,
    body,
    new Span(catchSpan.start, parser.previous().span.end),
  );
}
