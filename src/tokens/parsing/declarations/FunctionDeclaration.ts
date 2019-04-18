import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Body from '../Body';
import TypeKeyword from '../TypeKeyword';

class FunctionDeclaration extends Token {
  readonly id;

  readonly params: { type: Token, id: Token}[];

  readonly returns;

  readonly body;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.id = matchedTokens[1];

    this.params = matchedTokens[3]
      .filter((_, index) => index % 2 === 0)
      .map(param => ({ type: param[0], id: param[1] }));

    this.returns = matchedTokens[5][1];

    this.body = matchedTokens[6]
      .slice(1, matchedTokens[6].length - 1);
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(FunctionDeclaration, $.SEQ(
  tokens.Function,
  tokens.Symbol,

  tokens.Lpar,
  $.MANY_SEP(
    $.SEQ(
      $.OPT(TypeKeyword),
      tokens.Symbol,
    ),
    tokens.Comma,
  ),
  tokens.Rpar,

  $.OPT(
    $.SEQ(
      tokens.Returns,
      TypeKeyword,
    ),
  ),

  Body,
));
