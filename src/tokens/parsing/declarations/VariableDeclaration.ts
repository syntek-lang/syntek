import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import MemberExpression from '../expressions/MemberExpression';

class VariableDeclaration extends Token {
  readonly type;

  readonly array;

  readonly id;

  readonly init;

  constructor(matchedTokens) {
    super(matchedTokens);

    if (matchedTokens[0].length) {
      this.type = matchedTokens[0][0];

      if (matchedTokens[0][1].length) {
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
      $.OR(
        tokens.NumberKeyword,
        tokens.StringKeyword,
        tokens.BooleanKeyword,
        tokens.ObjectKeyword,
        tokens.AnyKeyword,
      ),
      $.OPT(
        $.SEQ(
          tokens.Lbra,
          tokens.Rbra,
        ),
      ),
    ),
  ),

  $.OR(
    tokens.Symbol,
    MemberExpression,
  ),
  tokens.Equal,
  Expression,
));
