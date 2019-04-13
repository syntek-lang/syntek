import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class ForStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ForStatement, $.SEQ(
  tokens.For,
  tokens.Symbol,
  tokens.In,
  Expression,
  Body,
));
