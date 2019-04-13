import Rule from '../Rule';
import { Token } from '../../token';

export default class SeqRule extends Rule {
  private readonly rules: Rule[];

  constructor(rules: Rule[]) {
    super();

    this.rules = rules;
  }

  match(tokens: Token[]) {
    let ruleCount = 0;
    let tokenCount = 0;

    const matchedTokens: any[] = [];

    while (ruleCount < this.rules.length) {
      const match = this.rules[ruleCount].match(tokens.slice(tokenCount));

      if (match.matches) {
        matchedTokens.push(match.tokens);

        ruleCount += 1;
        tokenCount += match.count;
      } else if (match.skip) {
        matchedTokens.push(match.tokens);

        ruleCount += 1;
      } else {
        return { matches: false, count: 0, tokens: [] };
      }
    }

    return { matches: true, count: tokenCount, tokens: matchedTokens };
  }
}
