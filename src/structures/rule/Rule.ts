import Token from '../token/Token';
import RuleResponse from './RuleResponse';

abstract class Rule {
  /**
   * Find a match in a list of tokens
   */
  abstract match(tokens: Token[]): RuleResponse;
}

export default Rule;
