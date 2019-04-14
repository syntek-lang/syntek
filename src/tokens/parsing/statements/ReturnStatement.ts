import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';

class ReturnStatement extends Token {
  readonly argument;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.argument = matchedTokens[1];
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(ReturnStatement, $.SEQ(
  tokens.Return,
  $.OPT(Expression),
));
