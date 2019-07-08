import { Node, LexicalToken, CallExpression } from '../../../../grammar';

import { Parser, ParseUtils } from '../../..';

export function callExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();

  const params = ParseUtils.matchExpressionList.call(this, LexicalToken.RPAR);

  return new CallExpression(left, params, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
