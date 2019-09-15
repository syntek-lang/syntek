import {
  Node, Token, LexicalToken, VariableType, CallExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericArgs, matchExpressionList } from '../../parse-utils';

export function callExpr(parser: Parser, left: Node, infix: Token): Node {
  parser.eatWhitespace();

  let genericArgs: VariableType[] = [];
  if (infix.type === LexicalToken.LT) {
    genericArgs = matchGenericArgs(parser);
    parser.eatWhitespace();

    parser.consume(LexicalToken.LPAR, "Expected '(' after '>'");
  }

  const params = matchExpressionList(parser, LexicalToken.RPAR);

  return new CallExpression(
    left,
    genericArgs,
    params,
    new Span(left.span.start, parser.previous().span.end),
  );
}
