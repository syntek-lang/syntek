import Rule from '../Rule';
import { Token } from '../../token';
import RuleResponse from '../RuleResponse';

export default class LookaheadRule extends Rule {
  private rule: Rule;

  match(tokens: Token[]): RuleResponse {
    return this.rule.match(tokens);
  }

  setRule(rule: Rule): void {
    this.rule = rule;
  }
}
