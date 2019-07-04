import {
  Node, LexicalToken, Statements, SwitchCase,
} from '../../..';

import { Parser } from '../../Parser';

export function switchStmt(this: Parser): Node {
  const start = this.previous().location.start;

  const expression = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after switch');
  this.consume(LexicalToken.INDENT, 'Expected indent after switch');

  const cases: SwitchCase[] = [];
  while (!this.match(LexicalToken.OUTDENT)) {
    const caseKeyword = this.consume(LexicalToken.CASE, 'Expected case');

    const conditions: Node[] = [];
    do {
      conditions.push(this.expression());
    } while (this.match(LexicalToken.COMMA));

    this.consume(LexicalToken.NEWLINE, 'Expected newline after case');
    this.consume(LexicalToken.INDENT, 'Expected indent after case');

    const body: Node[] = [];
    while (!this.match(LexicalToken.OUTDENT)) {
      body.push(this.declaration());
    }

    cases.push(new SwitchCase(conditions, body, {
      start: caseKeyword.location.start,
      end: this.previous().location.end,
    }));
  }

  return new Statements.SwitchStatement(expression, cases, {
    start,
    end: this.previous().location.end,
  });
}
