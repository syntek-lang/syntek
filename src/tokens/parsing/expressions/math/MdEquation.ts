import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

class MdEquation extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(MdEquation, $.SEQ(
  Expression,
  $.OPT(tokens.Space),
  $.OR(
    tokens.Star,
    tokens.Slash,
    tokens.Modulo,
  ),
  $.OPT(tokens.Space),
  Expression,
));
