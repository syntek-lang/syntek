import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Body from '../Body';

class FunctionDeclaration extends Token {
  readonly id;

  readonly params;

  readonly body;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.id = matchedTokens[1];
    this.params = matchedTokens[3].filter((_, index) => index % 2 === 0);
    this.body = matchedTokens[5].slice(1, matchedTokens[5].length - 1);
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
    tokens.Symbol,
    tokens.Comma,
  ),
  tokens.Rpar,

  Body,
));
