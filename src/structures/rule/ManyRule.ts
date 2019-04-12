import Rule from './Rule';
import Token from '../Token';

export default class ManyRule extends Rule {
  private readonly rule: Rule;

  constructor(rule: Rule) {
    super();

    this.rule = rule;
  }

  match(tokens: Token[]) {
    let tokenCounter = 0;

    while (tokenCounter < tokens.length) {
      const match = this.rule.match(tokens.slice(tokenCounter));

      if (match.matches) {
        tokenCounter += match.count;
      } else {
        return { matches: true, count: tokenCounter, tokens: tokens.slice(0, tokenCounter) };
      }
    }

    return { matches: true, count: tokenCounter, tokens };
  }
}
