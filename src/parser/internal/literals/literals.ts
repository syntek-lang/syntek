import {
  Node, Token,
  NumberLiteral, StringLiteral, BooleanLiteral,
} from '../../../grammar';

import { Parser } from '../..';

export function numberLiteral(_parser: Parser, literal: Token): Node {
  return new NumberLiteral(literal);
}

export function stringLiteral(_parser: Parser, literal: Token): Node {
  return new StringLiteral(literal);
}

export function booleanLiteral(_parser: Parser, literal: Token): Node {
  return new BooleanLiteral(literal);
}
