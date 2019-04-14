import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';
import MemberExpression from './MemberExpression';

class ExpressionStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ExpressionStatement, $.SEQ(
  $.OR(
    tokens.Symbol,
    MemberExpression,
  ),

  $.OR(
    // Function calls can contain logic, so it needs to be recursively parsed
    $.WRAPPED(
      tokens.Lpar,
      $.MANY_SEP(
        Expression,
        tokens.Comma,
      ),
      tokens.Rpar,
    ),

    // Array entry
    $.WRAPPED(
      tokens.Lbra,
      Expression,
      tokens.Rbra,
    ),
  ),
));
