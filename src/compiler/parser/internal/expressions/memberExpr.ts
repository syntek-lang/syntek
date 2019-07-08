import { Node, LexicalToken, MemberExpression } from '../../../../grammar';

import { Parser } from '../../..';

export function memberExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();
  const property = this.consume(LexicalToken.IDENTIFIER, 'Expected identifier');

  return new MemberExpression(left, property, {
    start: left.location.start,
    end: property.location.end,
  });
}
