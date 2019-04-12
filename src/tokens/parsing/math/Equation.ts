import { Token, TokenMatcher, $ } from '../../../structures';

import tokens from '../..';
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
