import { Node, LexicalToken, Statements } from '../../..';

import { Parser } from '../../Parser';

export function expressionStmt(this: Parser): Node {
  const expr = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after expression');

  return new Statements.ExpressionStatement(expr, {
    start: expr.location.start,
    end: this.previous().location.end,
  });
}
