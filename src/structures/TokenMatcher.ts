import Token from './Token';
import Rule from './rule/Rule';

export type TokenClass = new (index: number, content: string | Token | Token[]) => Token;

export default class TokenMatcher {
  readonly Class: TokenClass;

  readonly regex: RegExp;

  rule: Rule;

  constructor(Class: TokenClass);

  constructor(Class: TokenClass, rule: Rule);

  constructor(Class: TokenClass, regex: RegExp);

  constructor(Class: TokenClass, match?: RegExp | Rule) {
    this.Class = Class;

    if (match instanceof RegExp) {
      this.regex = match;
    } else if (match instanceof Rule) {
      this.rule = match;
    }
  }

  setRule(rule: Rule) {
    this.rule = rule;
  }
}
