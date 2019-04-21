import { $ } from '../../../structures/rule';
import { Token, TokenMatcher, DeclarationToken } from '../../../structures/token';

import tokens from '../../lexing';
import Body from '../Body';
import TypeKeyword from '../TypeKeyword';
import { Symbol } from '../../lexing/literals/Symbol';

export class FunctionDeclaration extends DeclarationToken {
  /**
   * The parameters of the function
   */
  readonly params: { type: Token, id: Symbol }[];

  /**
   * The return value of the function
   */
  readonly returns?: Token;

  /**
   * The body of the function
   */
  readonly body: Token[];

  constructor(location, matchedTokens) {
    super(matchedTokens[1], location, matchedTokens);

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

export const FunctionDeclarationMatcher = new TokenMatcher(FunctionDeclaration, $.SEQ(
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
