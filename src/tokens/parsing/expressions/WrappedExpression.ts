import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class WrappedExpression extends Token {
  readonly body;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.body = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(WrappedExpression, $.WRAPPED(
  tokens.Lpar,
  Expression,
  tokens.Rpar,
));
