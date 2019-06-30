import { Node, Expressions } from '../../..';

import { Matcher } from '../Matcher';
import { Utils } from '../Utils';

export function call(this: Matcher, left: Node): Node {
  this.eatWhitespace();

  const params = Utils.matchParamList.call(this);

  return new Expressions.CallExpression(left, params, {
    start: left.location.start,
    end: this.previous().location.end,
  });
}
