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
  $.OR(
    tokens.Star,
    tokens.Slash,
    tokens.Modulo,
  ),
  Expression,
));
