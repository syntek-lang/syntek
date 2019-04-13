import Rule from '../rule/Rule';
import TokenClass from './TokenClass';

export default class TokenMatcher {
  readonly Class: TokenClass;

  readonly regex: RegExp;

  readonly rule: Rule;

  constructor(Class: TokenClass, rule: Rule);

  constructor(Class: TokenClass, regex: RegExp);

  constructor(Class: TokenClass, match: RegExp | Rule) {
    this.Class = Class;

    if (match instanceof RegExp) {
      this.regex = match;
    } else {
      this.rule = match;
    }
  }
}
