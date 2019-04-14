import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';
import MemberExpression from './MemberExpression';

class ExpressionStatement extends Token {
  readonly type: 'function' | 'array';

  readonly callee;

  readonly arguments;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.type = matchedTokens[1][0] instanceof tokens.Lpar.Class ? 'function' : 'array';

    this.callee = matchedTokens[0];
    if (this.type === 'function') {
      if (matchedTokens[1].length <= 2) {
        this.arguments = [];
      } else {
        this.arguments = matchedTokens[1].filter((_, index) => index % 2 !== 0);
      }
    } else {
      this.arguments = matchedTokens[1][1];
    }
  }

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
