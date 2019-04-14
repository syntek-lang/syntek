import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import Body from '../Body';

class IfStatement extends Token {
  readonly condition;

  readonly body;

  readonly alternate: { condition?: Token, body: Token[] }[] = [];

  constructor(matchedTokens) {
    super(matchedTokens);

    // if
    this.condition = matchedTokens[1];
    this.body = matchedTokens[2].slice(1, matchedTokens[2].length - 1);

    // TODO: Add else if and else to this.alternate
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(IfStatement, $.SEQ(
  // if
  tokens.If,
  Expression,
  Body,

  // else if
  $.MANY(
    $.SEQ(
      tokens.ElseIf,
      Expression,
      Body,
    ),
  ),

  // else
  $.OPT(
    $.SEQ(
      tokens.Else,
      Body,
    ),
  ),
));
