import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

export class RepeatStatement extends Token {
  /**
   * The amount of iterations
   */
  readonly amount: Token;

  /**
   * The body of the repeat statement
   */
  readonly body: Token[];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.amount = matchedTokens[1];
    this.body = matchedTokens[3].slice(1, matchedTokens[3].length - 1);
  }

  build(): string {
    return '';
  }
}

export const RepeatStatementMatcher = new TokenMatcher(RepeatStatement, $.SEQ(
  tokens.Repeat,
  Expression,
  tokens.Times,
  Body,
));
