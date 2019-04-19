import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

class ImportDeclaration extends Token {
  /**
   * The type of the import. `module` for predeclared modules, `file` for project files.
   */
  readonly type: 'module' | 'file';

  /**
   * The source of the module
   */
  readonly source: Token;

  /**
   * The identifier that the module is loaded under
   */
  readonly id: Token;

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

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
