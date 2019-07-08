import { Node, LexicalToken, ForStatement } from '../../../../grammar';

import { Parser, ParseUtils, TypeDeclReport } from '../../..';

export function forStmt(this: Parser): Node {
  const start = this.previous().location.start;

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

  const identifier = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier after for');
  this.consume(LexicalToken.IN, 'Expected "in" after identifier');

  const object = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after for statement');

  this.syncIndentation();
  this.consume(LexicalToken.INDENT, 'Expected indent after for statement');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  return new ForStatement(
    identifier,
    {
      type: typeDeclReport.type,
      arrayDepth: typeDeclReport.arrayDepth,
    },
    object,
    body,
    {
      start,
      end: this.previous().location.end,
    },
  );
}
