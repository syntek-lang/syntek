import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class LogicalExpression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(LogicalExpression, $.SEQ(
  Expression,
  $.OR(
    tokens.And,
    tokens.Or,
  ),
  Expression,
));
