import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser } from '../../..';
import { VarDecl, skipVarSize } from '../../ParseUtils';

export function variableDecl(parser: Parser, varDecl: VarDecl): Node {
  skipVarSize(parser, varDecl);

  // Equals
  parser.eatWhitespace();
  parser.advance();

  parser.eatWhitespace();
  const expr = parser.expression();
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
