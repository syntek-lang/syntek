import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Expression from '../expressions/Expression';
import Body from '../Body';

export class IfStatement extends Token {
  /**
   * The `if`, `else if` and `else` statement conditions and bodies
   */
  readonly options: { condition?: Token, body: Token[] }[] = [];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    // if
    this.options.push({
      condition: matchedTokens[1],
      body: matchedTokens[2].slice(1, matchedTokens[2].length - 1),
    });

    // else if
    for (const elseIf of matchedTokens[3]) {
      this.options.push({
        condition: elseIf[1],
        body: elseIf[2].slice(1, elseIf[2].length - 1),
      });
    }

    // else
    if (matchedTokens[4].length) {
      this.options.push({
        body: matchedTokens[4][1].slice(1, matchedTokens[4][1].length - 1),
      });
    }
  }

  build(): string {
    return '';
  }
}

export const IfStatementMatcher = new TokenMatcher(IfStatement, $.SEQ(
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
