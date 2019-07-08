import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser, VarDeclReport } from '../../..';

export function variableDecl(parser: Parser, varDeclReport: VarDeclReport): Node {
  // Type
  if (varDeclReport.variableType) {
    parser.advance();

    // Array brackets
    for (let i = 0; i < varDeclReport.variableType.arrayDepth; i += 1) {
      parser.advance();
      parser.advance();
    }
  }

  // Identifier
  const identifier = parser.advance();

  // Equals
  parser.advance();

  parser.eatWhitespace();
  const expr = parser.expression();
  parser.consume(LexicalToken.NEWLINE, 'Expected newline after variable declaration');

  parser.syncIndentation();

  return new VariableDeclaration(
    identifier,
    varDeclReport.variableType,
    expr,
    {
      start: expr.location.start,
      end: parser.previous().location.end,
    },
  );
}
