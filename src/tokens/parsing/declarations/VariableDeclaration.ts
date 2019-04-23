import { $ } from '../../../structures/rule';
import { Token, TokenMatcher, DeclarationToken } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import { MemberExpression } from '../expressions/MemberExpression';
import { ArrayExpression } from '../expressions/ArrayExpression';

import TypeKeyword from '../TypeKeyword';

export class VariableDeclaration extends DeclarationToken {
  /**
   * The type of the variable
   */
  readonly type?: Token;

  /**
   * Whether the variable is an array
   */
  readonly array: boolean;

  /**
   * The initial value of the variable
   */
  readonly init: Token;

  constructor(location, matchedTokens) {
    super(matchedTokens[1], location, matchedTokens);

    if (matchedTokens[0].length) {
      this.type = matchedTokens[0][0];
      this.array = matchedTokens[0][1] instanceof ArrayExpression;
    } else {
      this.array = false;
    }

    this.init = matchedTokens[3];
  }

  build(): string {
    return '';
  }
}

export const VariableDeclarationMatcher = new TokenMatcher(VariableDeclaration, $.SEQ(
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
