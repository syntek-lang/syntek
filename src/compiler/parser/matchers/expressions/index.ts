import { Node, LexicalToken, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function index(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const indexExpr = this.expression();

  this.eatWhitespace();
  this.consume(LexicalToken.RSQB, 'Expected "]"');

  return new Expressions.IndexExpression(left, indexExpr, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
