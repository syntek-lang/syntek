import {
  Node, LexicalToken, ForStatement, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchTypeDecl } from '../../parse-utils';

export function forStmt(parser: Parser): Node {
  const forSpan = parser.previous().span;

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after "for"');

  let variableType: VariableType | null = null;
  if (parser.match(LexicalToken.COLON)) {
    variableType = matchTypeDecl(parser);
  }

  const inSpan = parser.consume(LexicalToken.IN, "Expected 'in' after the variable", (/* error */) => {
    // TODO: Add this back
    // error.info("Add 'in' after this variable", varDecl.span);
  }).span;

  const object = parser.expression("Expected an expression after 'in'", (error) => {
    error.info("Add an expression after this 'in'", inSpan);
  });

  parser.consume(LexicalToken.L_BRACE, "Expected '{'");

  const body: Node[] = [];
  while (!parser.match(LexicalToken.R_BRACE)) {
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
