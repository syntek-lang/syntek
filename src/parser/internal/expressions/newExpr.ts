import {
  Node, Token, LexicalToken, VariableType, NewExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { matchGenericArgs, matchExpressionList, matchVarLoc } from '../../parse-utils';

export function newExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;

  parser.ignoreNewline();
  const object = matchVarLoc(parser);
  parser.ignoreNewline();

  let genericArgs: VariableType[] = [];
  if (parser.match(LexicalToken.LT)) {
    genericArgs = matchGenericArgs(parser);
    parser.ignoreNewline();
  }

  parser.consume(LexicalToken.L_PAR, "Expected '(' after the class", (error) => {
    error.info("Add a '(' after this class", object.span);
  });
  const params = matchExpressionList(parser, LexicalToken.R_PAR);

  return new NewExpression(
    object,
    genericArgs,
    params,
    new Span(start, parser.previous().span.end),
  );
}
