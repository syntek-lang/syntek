import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import ExpressionStatement from './ExpressionStatement';

class NewExpression extends Token {
  /**
   * The token `new` is being called on
   */
  readonly callee: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.callee = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(NewExpression, $.SEQ(
  tokens.New,
  ExpressionStatement,
));
