import Rule from './Rule';
import Token from '../Token';

export default class LookaheadRule extends Rule {
  private rule: Rule;

  match(tokens: Token[]) {
    return this.rule.match(tokens);
  }

  setRule(rule: Rule) {
    this.rule = rule;
  }
}
