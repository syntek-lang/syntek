import Rule from '../Rule';
import { Token } from '../../token';
import RuleResponse from '../RuleResponse';

import Utils from '../../../utils';

import parser from '../../../compiler/parser';

export default class WrappedRule extends Rule {
  private readonly start: Rule;

  private readonly expected: Rule;

  private readonly end: Rule;

  constructor(start: Rule, expected: Rule, end: Rule) {
    super();

    this.start = start;
    this.expected = expected;
    this.end = end;
  }

  match(tokens: Token[]) {
    const startMatches: RuleResponse[] = [];
    const endMatches: RuleResponse[] = [];

    let i = 0;
    while (true) { // eslint-disable-line no-constant-condition
      const startMatch = this.start.match(tokens.slice(i));

      // Check if it matches a start
      if (startMatch.matches) {
        i += startMatch.count;

        startMatches.push(startMatch);
      } else {
        const endMatch = this.end.match(tokens.slice(i));

        // Check if it matches an end
        if (endMatch.matches) {
          i += endMatch.count;

          endMatches.push(endMatch);
        } else {
          // Else just skip the token
          i += 1;
        }
      }

      if (startMatches.length === endMatches.length) {
        break;
      }

      if (i >= tokens.length) {
        return { matches: false, count: 0, tokens: [] };
      }
    }

    // Return if we didn't match any opening or closing tokens
    if (startMatches.length === 0 || endMatches.length === 0) {
      return { matches: false, count: 0, tokens: [] };
    }

    const startTokenCount = startMatches[0].count;
    const endTokenCount = endMatches[endMatches.length - 1].count;

    const parsedTokens = parser(tokens.slice(
      startTokenCount,
      i - endTokenCount,
    ));

    if (Array.isArray(parsedTokens)) {
      const expectedMatch = this.expected.match(parsedTokens);

      if (expectedMatch.matches && expectedMatch.count >= parsedTokens.length) {
        return {
          matches: true,
          count: i,
          tokens: [
            ...Utils.arrayify(startMatches[0].tokens),
            ...parsedTokens,
            ...Utils.arrayify(endMatches[endMatches.length - 1].tokens),
          ],
        };
      }
    }

    return { matches: false, count: 0, tokens: [] };
  }
}
