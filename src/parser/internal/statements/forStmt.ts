import {
  Node, LexicalToken, ForStatement, VariableType,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchTypeDecl, matchBlock } from '../../parse-utils';

export function forStmt(parser: Parser): Node {
  const forSpan = parser.previous().span;

  parser.ignoreNewline();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected identifier after "for"');

  let variableType: VariableType | null = null;
  if (parser.matchIgnoreNewline(LexicalToken.COLON)) {
    parser.ignoreNewline();

    variableType = matchTypeDecl(parser);
  }

  parser.ignoreNewline();

  const inSpan = parser.consume(LexicalToken.IN, "Expected 'in' after the variable", (/* error */) => {
    // TODO: Add this back
    // error.info("Add 'in' after this variable", varDecl.span);
  }).span;

  parser.ignoreNewline();

  const object = parser.expression("Expected an expression after 'in'", (error) => {
    error.info("Add an expression after this 'in'", inSpan);
  });

  const body = matchBlock(parser);

  return new ForStatement(
    identifier,
    variableType,
    object,
    body,
    new Span(forSpan.start, parser.previous().span.end),
  );
}
