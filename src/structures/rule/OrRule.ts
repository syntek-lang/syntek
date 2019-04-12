import Rule from './Rule';
import Token from '../Token';

export default class SeqRule extends Rule {
  private readonly rules: Rule[];

  constructor(rules: Rule[]) {
    super();

    this.rules = rules;
  }

  match(tokens: Token[]) {
    for (const rule of this.rules) {
      const match = rule.match(tokens);

      if (match.matches) {
        // const matchTokens = Array.isArray(match.tokens) ? match.tokens : [match.tokens];

        // return { matches: true, count: match.count, tokens: matchTokens };
        return { matches: true, count: match.count, tokens: match.tokens };
      }
    }

    return { matches: false, count: 0, tokens: [] };
  }
}
