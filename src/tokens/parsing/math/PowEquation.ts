import { Token, TokenMatcher, $ } from '../../../structures';

import tokens from '../..';
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
