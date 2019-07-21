import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser } from '../../..';
import { Span } from '../../../../position';
import { VarDecl, skipVarSize } from '../../parse-utils';

export function variableDecl(parser: Parser, varDecl: VarDecl): Node {
  skipVarSize(parser, varDecl);

  // Equals
  parser.eatWhitespace();
  parser.advance();

  parser.eatWhitespace();
  const expr = parser.expression('decl.variable.expression_after_equal');
  parser.consume(LexicalToken.NEWLINE, 'decl.variable.newline_after_variable_decl');

  parser.syncIndentation();

  return new VariableDeclaration(
    varDecl.identifier,
    varDecl.variableType,
    expr,
    new Span(expr.span.start, parser.previous().span.end),
  );
}
