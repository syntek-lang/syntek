import {
  Node, LexicalToken, TryStatement, CatchStatement, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchTypeDecl } from '../../parse-utils';

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

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier after "catch"');

  let variableType: VariableType | null = null;
  if (parser.matchIgnoreWhitespace(LexicalToken.COLON)) {
    parser.eatWhitespace();
    variableType = matchTypeDecl(parser);
  }

  parser.consume(LexicalToken.NEWLINE, "Expected a newline and indent after 'catch'", (/* error */) => {
    // TODO: Add this back
    // error.info('Add a newline after the variable', varDecl.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, "Expected a newline and indent after 'catch'", (/* error */) => {
    // TODO: Add this back
    // error.info('Add an indent after the variable', varDecl.span);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new CatchStatement(
    identifier,
    variableType,
    body,
    new Span(catchSpan.start, parser.previous().span.end),
  );
}
