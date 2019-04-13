import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

class Equation extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(Equation, $.SEQ(
  Expression,
  $.OPT(tokens.Space),
  $.OR(
    tokens.Plus,
    tokens.Minus,
  ),
  $.OPT(tokens.Space),
  Expression,
));
