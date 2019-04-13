import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import Body from '../Body';

class IfStatement extends Token {
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
