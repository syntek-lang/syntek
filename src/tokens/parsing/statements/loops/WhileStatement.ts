import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class WhileStatement extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(WhileStatement, $.SEQ(
  tokens.While,
  Expression,
  Body,
));
