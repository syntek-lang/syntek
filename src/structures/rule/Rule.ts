import Token from '../Token';
import RuleResponse from './RuleResponse';

abstract class Rule {
  abstract match(tokens: Token[]): RuleResponse;
}

export default Rule;
