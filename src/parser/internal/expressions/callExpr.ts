import {
  Node, LexicalToken, VariableType, CallExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchExpressionList } from '../../parse-utils';

export function callExpr(parser: Parser, left: Node): Node {
  const genericArgs: VariableType[] = [];
  // if (infix.type === LexicalToken.LT) {
  //   genericArgs = matchGenericArgs(parser);
  //
  //   parser.consume(LexicalToken.L_PAR, "Expected '(' after '>'");
  // }

  const params = matchExpressionList(parser, LexicalToken.R_PAR);

  return new CallExpression(
    left,
    genericArgs,
    params,
    new Span(left.span.start, parser.previous().span.end),
  );
}
