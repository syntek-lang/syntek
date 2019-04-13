import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import Body from '../Body';

class FunctionDeclaration extends Token {
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
