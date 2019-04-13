import Rule from '../Rule';
import { Token } from '../../token';

export default class OptRule extends Rule {
  private readonly rule: Rule;

  constructor(rule: Rule) {
    super();

    this.rule = rule;
  }

  match(tokens: Token[]) {
    return {
      ...this.rule.match(tokens),
      skip: true,
    };
  }
}
