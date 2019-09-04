import {
  Node, Token, LexicalToken, ConditionalExpression,
} from '../../../grammar';

import { Parser } from '../..';
import { Span } from '../../../position';

export function conditionalExpr(parser: Parser, prefix: Token): Node {
  parser.eatWhitespace();

  const condition = parser.expression('Expected an expression after "if"', (error) => {
    error.info('Add an expression after the "if"', prefix.span);
  });
  parser.eatWhitespace();

  const thenSpan = parser.consume(LexicalToken.THEN, 'Expected then after the expression').span;
  parser.eatWhitespace();

  const whenTrue = parser.expression('Expected an expression after "then"', (error) => {
    error.info('Add an expression after the "then"', thenSpan);
  });
  parser.eatWhitespace();

  const elseSpan = parser.consume(LexicalToken.ELSE, 'Expected else after the expression').span;
  parser.eatWhitespace();

  const whenFalse = parser.expression('Expected an expression after "else"', (error) => {
    error.info('Add an expression after the "else"', elseSpan);
  });

  return new ConditionalExpression(
    condition,
    whenTrue,
    whenFalse,
    new Span(prefix.span.start, parser.previous().span.end),
  );
}
