import Rule from './Rule';
import Token from '../Token';

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
