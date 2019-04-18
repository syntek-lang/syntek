import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

class ForStatement extends Token {
  /**
   * The identifier declared in the for loop
   */
  readonly id: Token;

  /**
   * The collection to iterate over
   */
  readonly collection: Token;

  /**
   * The body of the for loop
   */
  readonly body: Token[];

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
