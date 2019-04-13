import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../Expression';

class PowEquation extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(PowEquation, $.SEQ(
  Expression,
  $.OPT(tokens.Space),
  tokens.Pow,
  $.OPT(tokens.Space),
  Expression,
));
