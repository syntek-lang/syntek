import {
  Node, Token, LexicalToken, VariableType, NewExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';
import { Precedence } from '../../Precedence';
import { matchGenericArgs, matchExpressionList } from '../../parse-utils';

import { memberExpr } from './memberExpr';

export function newExpr(parser: Parser, prefix: Token): Node {
  const start = prefix.span.start;
  parser.eatWhitespace();

  let object = parser.parsePrecedence(Precedence.OP13, "Expected an expression after 'new'", (error) => {
    error.info('Add an expression after this new', prefix.span);
  });
  parser.eatWhitespace();

  while (parser.match(LexicalToken.DOT)) {
    object = memberExpr(parser, object, parser.previous());
  }
  parser.eatWhitespace();

  let genericArgs: VariableType[] = [];
  if (parser.match(LexicalToken.LT)) {
    genericArgs = matchGenericArgs(parser);
    parser.eatWhitespace();
  }

  parser.consume(LexicalToken.LPAR, "Expected '(' after the class", (error) => {
    error.info("Add a '(' after this class", object.span);
  });
  const params = matchExpressionList(parser, LexicalToken.RPAR);

  return new NewExpression(
    object,
    genericArgs,
    params,
    new Span(start, parser.previous().span.end),
  );
}