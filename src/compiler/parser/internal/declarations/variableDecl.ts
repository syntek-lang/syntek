import {
  Node, LexicalToken, VariableDeclaration, VariableType,
} from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { matchTypeDecl } from '../../parse-utils';

export function variableDecl(parser: Parser): Node {
  const start = parser.peek().span.start;
  parser.eatWhitespace();

  const identifier = parser.consume(LexicalToken.IDENTIFIER, 'Expected an identifier after "var"');

  let variableType: VariableType | null = null;
  if (parser.matchIgnoreWhitespace(LexicalToken.COLON)) {
    parser.eatWhitespace();
    variableType = matchTypeDecl(parser);
  }

  // Equals
  parser.eatWhitespace();
  const equalSpan = parser.advance().span;
  parser.eatWhitespace();

  const expr = parser.expression("Expected an expression after '='", (error) => {
    error.info('Add an expression after this =', equalSpan);
  });

  parser.consume(LexicalToken.NEWLINE, 'Expected a newline after the variable declaration', (error) => {
    error.info('Add a newline after this expression', expr.span);
  });

  parser.syncIndentation();

  return new VariableDeclaration(
    identifier,
    variableType,
    expr,
    new Span(start, parser.previous().span.end),
  );
}
