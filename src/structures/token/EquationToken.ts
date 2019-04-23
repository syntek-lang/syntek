import Token from './Token';

abstract class EquationToken extends Token {
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

  constructor(left: Token, operator: Token, right: Token, location, matchedTokens) {
    super(location, matchedTokens);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export default EquationToken;
