import { Token } from '..';

import { ExpressionMatcher } from './matchers/ExpressionMatcher';

export function parse(tokens: Token[]): any {
  const expressionMatcher = new ExpressionMatcher(tokens);
  return expressionMatcher.expression();
}
