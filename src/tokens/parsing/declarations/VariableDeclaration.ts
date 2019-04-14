import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import MemberExpression from '../expressions/MemberExpression';

class VariableDeclaration extends Token {
  readonly id;

  readonly init;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.id = matchedTokens[0];
    this.init = matchedTokens[2];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(VariableDeclaration, $.SEQ(
  $.OR(
    tokens.Symbol,
    MemberExpression,
  ),
  tokens.Equal,
  Expression,
));
