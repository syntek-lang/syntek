import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';

class ReturnStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ReturnStatement, $.SEQ(
  tokens.Return,
  $.OPT(Expression),
));
