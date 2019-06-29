import { Token, LexicalToken } from '..';

import { ExpressionMatcher } from './matchers/ExpressionMatcher';

export function parse(tokens: Token[]): any {
  const expressionMatcher = new ExpressionMatcher(tokens
    .filter(token => token.type !== LexicalToken.WHITESPACE));
  return expressionMatcher.expression();
}
