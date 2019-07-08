import { Node, LexicalToken, VariableDeclaration } from '../../../../grammar';

import { Parser, VarDeclReport } from '../../..';

export function variableDecl(this: Parser, varDeclReport: VarDeclReport): Node {
  // Type
  if (varDeclReport.type) {
    this.advance();
  }

  // Array brackets
  for (let i = 0; i < varDeclReport.arrayDepth; i += 1) {
    this.advance();
    this.advance();
  }

  // Identifier
  const identifier = this.advance();

  // Equals
  this.advance();

  this.eatWhitespace();
  const expr = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after variable declaration');

  this.syncIndentation();

  return new VariableDeclaration(
    identifier,
    varDeclReport.type,
    varDeclReport.arrayDepth,
    expr,
    {
      start: expr.location.start,
      end: this.previous().location.end,
    },
  );
}
