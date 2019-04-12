import Rule from './Rule';
import Token from '../Token';
import { TokenClass } from '../TokenMatcher';

export default class TokenMatcherRule extends Rule {
  private readonly tokenClass: TokenClass;

  constructor(tokenClass: TokenClass) {
    super();

    this.tokenClass = tokenClass;
  }

  match(tokens: Token[]) {
    if (tokens[0] instanceof this.tokenClass) {
      return { matches: true, count: 1, tokens: tokens[0] };
    }

    return { matches: false, count: 0, tokens: [] };
  }
}
