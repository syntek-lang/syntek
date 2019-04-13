import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class ExpressionStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ExpressionStatement, $.SEQ(
  tokens.Symbol,
  tokens.Lpar,
  $.MANY_SEP(
    Expression,
    tokens.Comma,
  ),
  tokens.Rpar,
));
