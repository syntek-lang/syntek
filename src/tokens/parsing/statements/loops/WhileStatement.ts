import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class WhileStatement extends Token {
  /**
   * The condition of the while loop
   */
  readonly condition: Token;

  /**
   * The body of the while loop
   */
  readonly body: Token[];

  constructor(matchedTokens) {
    super(matchedTokens);

    this.condition = matchedTokens[1];
    this.body = matchedTokens[2].slice(1, matchedTokens[2].length - 1);
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(WhileStatement, $.SEQ(
  tokens.While,
  Expression,
  Body,
));
