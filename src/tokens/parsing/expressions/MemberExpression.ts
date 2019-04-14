import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

class MemberExpression extends Token {
  readonly object;

  readonly property;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.object = matchedTokens[0];
    this.property = matchedTokens[2];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(MemberExpression, $.SEQ(
  $.OR(
    tokens.Symbol,
    tokens.This,
    MemberExpression,
  ),
  tokens.Dot,
  tokens.Symbol,
));
