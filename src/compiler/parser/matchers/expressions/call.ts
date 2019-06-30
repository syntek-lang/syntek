import { Node, LexicalToken, Expressions } from '../../..';

import { Matcher } from '../Matcher';
import { Utils } from '../Utils';

export function call(this: Matcher, left: Node): Node {
  this.eatWhitespace();

  const params = Utils.matchExpressionList.call(this, LexicalToken.RPAR);

  return new Expressions.CallExpression(left, params, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
