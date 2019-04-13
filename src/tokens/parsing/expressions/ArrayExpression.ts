import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from './Expression';

class ArrayExpression extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ArrayExpression, $.SEQ(
  tokens.Lbra,
  $.MANY_SEP(
    Expression,
    tokens.Comma,
  ),
  tokens.Rbra,
));
