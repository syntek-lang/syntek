import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

export class WrappedExpression extends Token {
  /**
   * The body of the wrapped expression
   */
  readonly body: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.body = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export const WrappedExpressionMatcher = new TokenMatcher(WrappedExpression, $.WRAPPED(
  tokens.Lpar,
  Expression,
  tokens.Rpar,
));
