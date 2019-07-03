import { Node, LexicalToken, Declarations } from '../../..';

import { Parser } from '../../Parser';
import { VarDeclReport } from '../Utils';

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

  this.syncWhitespace();

  return new Declarations.VariableDeclaration(
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
