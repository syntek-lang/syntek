import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser } from '../../..';
import { VarDecl, skipVarSize } from '../../parse-utils';

export function variableDecl(parser: Parser, varDecl: VarDecl): Node {
  skipVarSize(parser, varDecl);

  // Equals
  parser.eatWhitespace();
  parser.advance();

  parser.eatWhitespace();
  const expr = parser.expression('Expected expression after "="');
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after variable declaration');

  parser.syncIndentation();

  return new VariableDeclaration(
    varDecl.identifier,
    varDecl.variableType,
    expr,
    {
      start: expr.location.start,
      end: parser.previous().location.end,
    },
  );
}
