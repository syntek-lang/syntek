import Rule from '../Rule';
import { Token } from '../../token';
import RuleResponse from '../RuleResponse';

export default class OptRule extends Rule {
  private readonly rule: Rule;

  constructor(rule: Rule) {
    super();

    this.rule = rule;
  }

  match(tokens: Token[]): RuleResponse {
    return {
      ...this.rule.match(tokens),
      skip: true,
    };
  }
}
