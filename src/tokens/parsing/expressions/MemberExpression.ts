import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

class MemberExpression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(MemberExpression, $.SEQ(
  $.OR(
    tokens.Symbol,
    tokens.This,
    MemberExpression,
  ),
  tokens.Dot,
  tokens.Symbol,
));
