/* eslint-disable no-constant-condition, no-param-reassign */

import { Token, TokenMatcher } from '../structures/token';
import Utils from '../utils';

import matchers from '../tokens/parsing';

export default function parser(tokens: Token[]): Token[] {
  while (true) {
    let change = false;

    for (const matcherName of Object.keys(matchers)) {
      const matcher = (matchers[matcherName] as TokenMatcher);

      for (let i = 0; i < tokens.length; i += 1) {
        const match = matcher.rule.match(tokens.slice(i));

        if (match.matches) {
          const matchTokens = Array.isArray(match.tokens) ? match.tokens : [match.tokens];

          const location = {
            start: Utils.findFirstElement(matchTokens).location.start,
            end: Utils.findLastElement(matchTokens).location.end,
          };
          const token = new matcher.Class(location, matchTokens);

          tokens = [
            ...tokens.slice(0, i),
            token,
            ...tokens.slice(i + match.count),
          ];

          change = true;
          break;
        }
      }

      if (change) {
        break;
      }
    }

    if (!change) {
      break;
    }
  }

  return tokens;
}
