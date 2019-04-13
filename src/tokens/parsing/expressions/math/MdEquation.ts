import { Token, TokenMatcher, $ } from '../../../../structures';

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
