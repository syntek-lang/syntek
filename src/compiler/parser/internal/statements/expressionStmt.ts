import { Node, LexicalToken, ExpressionStatement } from '../../../../grammar';

import { Parser } from '../../..';

export function expressionStmt(this: Parser): Node {
  const expr = this.expression();
  this.consume(LexicalToken.NEWLINE, 'Expected newline after expression');

  this.syncIndentation();

  return new ExpressionStatement(expr, {
    start: expr.location.start,
    end: this.previous().location.end,
  });
}
