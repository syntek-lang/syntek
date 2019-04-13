import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class ComparisonExpression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ComparisonExpression, $.SEQ(
  Expression,
  $.OR(
    tokens.Is,
    tokens.IsNot,
    tokens.IsLessThan,
    tokens.IsGreaterThan,
  ),
  Expression,
));
