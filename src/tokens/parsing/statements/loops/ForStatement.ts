import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class ForStatement extends Token {
  readonly id;

  readonly collection;

  readonly body;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.id = matchedTokens[1];
    this.collection = matchedTokens[3];
    this.body = matchedTokens[4].slice(1, matchedTokens[4].length - 1);
  }

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
