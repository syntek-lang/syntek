import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class LogicalExpression extends Token {
  readonly left;

  readonly operator;

  readonly right;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.left = matchedTokens[0];
    this.operator = matchedTokens[1];
    this.right = matchedTokens[2];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(LogicalExpression, $.SEQ(
  Expression,
  $.OR(
    tokens.And,
    tokens.Or,
  ),
  Expression,
));
