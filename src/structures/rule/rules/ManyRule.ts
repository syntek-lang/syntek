import Rule from '../Rule';
import { Token } from '../../token';

export default class ManyRule extends Rule {
  private readonly rule: Rule;

  constructor(rule: Rule) {
    super();

    this.rule = rule;
  }

  match(tokens: Token[]) {
    let tokenCounter = 0;
    const matchedTokens: any[] = [];

    while (tokenCounter < tokens.length) {
      const match = this.rule.match(tokens.slice(tokenCounter));

      if (match.matches) {
        tokenCounter += match.count;

        matchedTokens.push(match.tokens);
      } else {
        break;
      }
    }

    return { matches: true, count: tokenCounter, tokens: matchedTokens };
  }
}
