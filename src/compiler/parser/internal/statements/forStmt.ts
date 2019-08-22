import { Node, LexicalToken, ForStatement, VariableType } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { matchTypeDecl } from '../../parse-utils';

export function forStmt(parser: Parser): Node {
  const forSpan = parser.previous().span;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after "for"')

  let variableType: VariableType | null = null;
  if (parser.match(LexicalToken.COLON)) {
    variableType = matchTypeDecl(parser);
  }

  parser.eatWhitespace();
  const inSpan = parser.consume(LexicalToken.IN, "Expected 'in' after the variable", (/*error*/) => {
    // TODO: Add this back
    // error.info("Add 'in' after this variable", varDecl.span);
  }).span;

  parser.eatWhitespace();
  const object = parser.expression("Expected an expression after 'in'", (error) => {
    error.info("Add an expression after this 'in'", inSpan);
  });

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline and indent after the for statement', (error) => {
    error.info('Add a newline after this expression', object.span);
  });
  parser.syncIndentation();
  parser.consume(LexicalToken.INDENT, 'Expected a newline and indent after the for statement', (error) => {
    error.info('Add an indent after this expression', object.span);
  });

  const body: Node[] = [];
  while (!parser.match(LexicalToken.OUTDENT)) {
    body.push(parser.declaration());
  }

  return new ForStatement(
    identifier,
    variableType,
    object,
    body,
    new Span(forSpan.start, parser.previous().span.end),
  );
}
