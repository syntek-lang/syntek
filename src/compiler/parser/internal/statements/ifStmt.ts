import {
  Node, LexicalToken, IfStatement, ElseStatement,
} from '../../../../grammar';

import { Parser } from '../../..';

function elseStmt(this: Parser): Node {
  const start = this.previous().location.start;

  this.consume(LexicalToken.NEWLINE, 'Expected newline after else');
  this.consume(LexicalToken.INDENT, 'Expected indent after else');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  return new ElseStatement(body, {
    start,
    end: this.previous().location.end,
  });
}

export function ifStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const condition = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after if');

  this.syncIndentation();
  this.consume(LexicalToken.INDENT, 'Expected indent after if');

  const body: Node[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    body.push(this.declaration());
  }

  let elseClause = null;
  if (this.match(LexicalToken.ELSE)) {
    if (this.match(LexicalToken.IF)) {
      elseClause = ifStmt.call(this);
    } else {
      elseClause = elseStmt.call(this);
    }
  }

  return new IfStatement(condition, body, elseClause, {
    start,
    end: this.previous().location.end,
  });
}
