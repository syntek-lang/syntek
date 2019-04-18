import Rule from '../rule/Rule';
import TokenClass from './TokenClass';

export default class TokenMatcher {
  /**
   * The class of the token
   */
  readonly Class: TokenClass;

  /**
   * A regex used for finding a match during lexing
   */
  readonly regex: RegExp;

  /**
   * The rule for matching a group of tokens during parsing
   */
  readonly rule: Rule;

  /**
   * Create a new token matcher
   *
   * @param Class - The class of the token
   * @param rule - The rule for matching the token
   */
  constructor(Class: TokenClass, rule: Rule);

  /**
   * Create a new token matcher
   *
   * @param Class - The class of the token
   * @param regex - The regex for matching the token
   */
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
