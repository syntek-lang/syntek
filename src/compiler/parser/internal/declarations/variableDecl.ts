import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { VarDecl, skipVarSize } from '../../parse-utils';

export function variableDecl(parser: Parser, varDecl: VarDecl): Node {
  const start = parser.peek().span.start;

  skipVarSize(parser, varDecl);

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
    varDecl.identifier,
    varDecl.variableType,
    expr,
    new Span(start, parser.previous().span.end),
  );
}
