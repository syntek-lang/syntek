import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

class ImportDeclaration extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ImportDeclaration, $.SEQ(
  tokens.Import,

  $.OR(
    tokens.Symbol,
    tokens.String,
  ),

  $.OPT(
    $.SEQ(
      tokens.As,
      tokens.Symbol,
    ),
  ),
));
