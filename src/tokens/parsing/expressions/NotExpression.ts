import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class NotExpression extends Token {
  /**
   * The token `not` is being called on
   */
  readonly argument: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.argument = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(NotExpression, $.SEQ(
  tokens.Not,
  Expression,
));
