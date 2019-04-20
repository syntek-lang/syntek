import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

export class MemberExpression extends Token {
  /**
   * The object that holds the property
   */
  readonly object: Token;

  /**
   * The property retrieved from the object
   */
  readonly property: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.object = matchedTokens[0];
    this.property = matchedTokens[2];
  }

  build(): string {
    return '';
  }
}

export const MemberExpressionMatcher = new TokenMatcher(MemberExpression, $.SEQ(
  $.OR(
    tokens.Symbol,
    tokens.This,
    MemberExpression,
  ),
  tokens.Dot,
  tokens.Symbol,
));
