import { Node, LexicalToken, Expressions } from '../../..';

import { Parser } from '../../Parser';
import { Utils } from '../Utils';

export function callExpr(this: Parser, left: Node): Node {
  this.eatWhitespace();

  const params = Utils.matchExpressionList.call(this, LexicalToken.RPAR);

  return new Expressions.CallExpression(left, params, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
