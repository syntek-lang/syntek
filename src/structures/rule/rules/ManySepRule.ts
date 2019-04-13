import Rule from '../Rule';
import { Token } from '../../token';
import RuleResponse from '../RuleResponse';

export default class ManySepRule extends Rule {
  private readonly rule: Rule;

  private readonly separatorRule: Rule;

  constructor(rule: Rule, separatorRule: Rule) {
    super();

    this.rule = rule;
    this.separatorRule = separatorRule;
  }

  match(tokens: Token[]) {
    let separatorRule = true;

    let separatorMatch: RuleResponse | undefined;
    let separatorTokenCount = 0;

    let tokenCount = 0;
    const matchedTokens: any[] = [];

    while (tokenCount < tokens.length) {
      separatorRule = !separatorRule;
      const rule = separatorRule ? this.separatorRule : this.rule;

      const currentMatch = rule.match(tokens.slice(tokenCount + separatorTokenCount));

      if (!currentMatch.matches) {
        break;
      }

      if (separatorRule) {
        separatorMatch = currentMatch;
        separatorTokenCount = currentMatch.count;
      } else {
        if (separatorMatch) {
          tokenCount += separatorMatch.count;
          matchedTokens.push(separatorMatch.tokens);

          separatorTokenCount = 0;
        }

        tokenCount += currentMatch.count;
        matchedTokens.push(currentMatch.tokens);
      }
    }

    return { matches: true, count: tokenCount, tokens: matchedTokens };
  }
}
