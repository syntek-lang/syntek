import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import MemberExpression from '../expressions/MemberExpression';
import ArrayExpression from '../expressions/ArrayExpression';

import TypeKeyword from '../TypeKeyword';

class VariableDeclaration extends Token {
  /**
   * The type of the variable
   */
  readonly type: Token;

  /**
   * Whether the variable is an array
   */
  readonly array: boolean;

  /**
   * The identifier of the variable
   */
  readonly id: Token;

  /**
   * The initial value of the variable
   */
  readonly init: Token;

  constructor(matchedTokens) {
    super(matchedTokens);

    if (matchedTokens[0].length) {
      this.type = matchedTokens[0][0];

      if (matchedTokens[0][1] instanceof ArrayExpression.Class) {
        this.array = true;
      }
    }

    this.id = matchedTokens[1];
    this.init = matchedTokens[3];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(VariableDeclaration, $.SEQ(
  $.OPT(
    $.SEQ(
      TypeKeyword,
      $.OPT(ArrayExpression),
    ),
  ),

  $.OR(
    tokens.Symbol,
    MemberExpression,
  ),
  tokens.Equal,
  Expression,
));
