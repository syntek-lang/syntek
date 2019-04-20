import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

export class MdEquation extends Token {
  /**
   * The left hand side of the equation
   */
  readonly left: Token;

  /**
   * The operator of the equation
   */
  readonly operator: Token;

  /**
   * The right hand side of the equation
   */
  readonly right: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.left = matchedTokens[0];
    this.operator = matchedTokens[1];
    this.right = matchedTokens[2];
  }

  build(): string {
    return '';
  }
}

export const MdEquationMatcher = new TokenMatcher(MdEquation, $.SEQ(
  Expression,
  $.OR(
    tokens.Star,
    tokens.Slash,
    tokens.Modulo,
  ),
  Expression,
));
