import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class RepeatStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(RepeatStatement, $.SEQ(
  tokens.Repeat,
  Expression,
  tokens.Times,
  Body,
));
