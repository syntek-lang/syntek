import { Node, LexicalToken, TryStatement } from '../../../../grammar';

import { Parser, ParseUtils, TypeDeclReport } from '../../..';

export function tryStmt(this: Parser): Node {
  const start = this.previous().location.start;
  this.consume(LexicalToken.NEWLINE, 'Expected newline after try');
  this.consume(LexicalToken.INDENT, 'Expected indent after try');

  const tryBody: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    tryBody.push(this.declaration());
  }

  this.consume(LexicalToken.CATCH, 'Expected catch after try block');

  const typeDeclReport: TypeDeclReport = ParseUtils.matchTypeDecl.call(this);

  const identifier = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier after catch');
  this.consume(LexicalToken.NEWLINE, 'Expected newline after catch');
  this.consume(LexicalToken.INDENT, 'Expected indent after catch');

  const catchBody: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    catchBody.push(this.declaration());
  }

  return new TryStatement(
    tryBody,
    identifier,
    typeDeclReport.variableType,
    catchBody,
    {
      start,
      end: this.previous().location.end,
    },
  );
}
