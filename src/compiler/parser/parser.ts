import { Token, LexicalToken } from '..';

import { Matcher } from './matchers/Matcher';

export function parse(tokens: Token[]): any {
  const filteredTokens = tokens.filter(token => token.type !== LexicalToken.WHITESPACE);

  const expressionMatcher = new Matcher(filteredTokens);
  return expressionMatcher.expression();
}
