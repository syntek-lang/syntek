import Rule from '../Rule';
import { Token, TokenClass } from '../../token';
import RuleResponse from '../RuleResponse';

export default class TokenMatcherRule extends Rule {
  private readonly tokenClass: TokenClass;

  constructor(tokenClass: TokenClass) {
    super();

    this.tokenClass = tokenClass;
  }

  match(tokens: Token[]): RuleResponse {
    if (tokens[0] instanceof this.tokenClass) {
      return { matches: true, count: 1, tokens: tokens[0] };
    }

    return { matches: false, count: 0, tokens: [] };
  }
}
