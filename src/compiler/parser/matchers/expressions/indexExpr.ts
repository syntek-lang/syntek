import { Node, LexicalToken, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function indexExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const expr = this.expression();

  this.eatWhitespace();
  this.consume(LexicalToken.RSQB, 'Expected "]"');

  return new Expressions.IndexExpression(left, expr, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
