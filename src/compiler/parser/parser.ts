import { Token, LexicalToken } from '..';

import { ExpressionMatcher } from './matchers/ExpressionMatcher';

export function parse(tokens: Token[]): any {
  const filteredTokens = tokens.filter(token => token.type !== LexicalToken.WHITESPACE);

  const expressionMatcher = new ExpressionMatcher(filteredTokens);
  return expressionMatcher.expression();
}
