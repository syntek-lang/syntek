import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

class ImportDeclaration extends Token {
  readonly type: 'module' | 'file';

  readonly source;

  readonly id;

  constructor(matchedTokens) {
    super(matchedTokens);

    this.type = matchedTokens[1] instanceof tokens.Symbol.Class ? 'module' : 'file';
    this.source = matchedTokens[1];

    if (this.type === 'module') {
      this.id = matchedTokens[2][1] || this.source;
    } else {
      this.id = matchedTokens[2][1];
    }
  }

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
