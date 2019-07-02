import { Node, Token, Expressions } from '../../..';

import { Parser } from '../../Parser';

export function thisLiteral(this: Parser, literal: Token): Node {
  return new Expressions.This(literal.location);
}
