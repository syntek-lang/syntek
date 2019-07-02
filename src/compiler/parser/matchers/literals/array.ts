import {
  Node, Token, LexicalToken, Expressions,
} from '../../..';

import { Parser } from '../../Parser';
import { Utils } from '../Utils';

export function array(this: Parser, prefix: Token): Node {
  const start = prefix.location.start;
  this.eatWhitespace();

  const content = Utils.matchExpressionList.call(this, LexicalToken.RSQB);
  return new Expressions.ArrayExpression(content, {
    start,
    end: this.previous().location.end,
  });
}
