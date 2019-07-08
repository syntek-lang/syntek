import { Node, LexicalToken, IndexExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function indexExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const expr = this.expression();

  this.eatWhitespace();
  this.consume(LexicalToken.RSQB, 'Expected "]"');

  return new IndexExpression(left, expr, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
