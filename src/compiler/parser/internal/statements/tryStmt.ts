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
  if (typeDeclReport.isTypeDecl) {
    // Type
    this.advance();

    // Array brackets
    for (let i = 0; i < typeDeclReport.arrayDepth; i += 1) {
      this.advance();
      this.advance();
    }
  }

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
    {
      type: typeDeclReport.type,
      arrayDepth: typeDeclReport.arrayDepth,
    },
    catchBody,
    {
      start,
      end: this.previous().location.end,
    },
  );
}
