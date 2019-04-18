import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import Body from '../Body';

class IfStatement extends Token {
  /**
   * The condition of the initial if statement
   */
  readonly condition: Token;

  /**
   * The body of the initial if statement
   */
  readonly body: Token[];

  /**
   * The alternate conditions, `else`/`else if` statements
   */
  readonly alternate: { condition?: Token, body: Token[] }[] = [];

  constructor(matchedTokens) {
    super(matchedTokens);

    // if
    this.condition = matchedTokens[1];
    this.body = matchedTokens[2].slice(1, matchedTokens[2].length - 1);

    // else if
    const elseIfs = matchedTokens[3];
    for (let i = 0; i < elseIfs.length; i += 1) {
      this.alternate.push({
        condition: elseIfs[i][1],
        body: elseIfs[i][2].slice(1, elseIfs[i][2].length - 1),
      });
    }

    // else
    this.alternate.push({
      body: matchedTokens[4][1].slice(1, matchedTokens[4][1].length - 1),
    });
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(IfStatement, $.SEQ(
  // if
  tokens.If,
  Expression,
  Body,

  // else if
  $.MANY(
    $.SEQ(
      tokens.ElseIf,
      Expression,
      Body,
    ),
  ),

  // else
  $.OPT(
    $.SEQ(
      tokens.Else,
      Body,
    ),
  ),
));
