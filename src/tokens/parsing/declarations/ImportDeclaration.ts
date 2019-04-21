import { $ } from '../../../structures/rule';
import { Token, TokenMatcher, DeclarationToken } from '../../../structures/token';

import tokens from '../../lexing';

export class ImportDeclaration extends DeclarationToken {
  /**
   * The type of the import. `module` for predeclared modules, `file` for project files.
   */
  readonly type: 'module' | 'file';

  /**
   * The source of the module
   */
  readonly source: Token;

  constructor(location, matchedTokens) {
    const type = matchedTokens[1] instanceof tokens.Symbol ? 'module' : 'file';
    const source = matchedTokens[1];

    let id;
    if (type === 'module') {
      id = matchedTokens[2][1] || source;
    } else {
      id = matchedTokens[2][1];
    }

    super(id, location, matchedTokens);

    this.type = type;
    this.source = source;
  }

  build(): string {
    return '';
  }
}

export const ImportDeclarationMatcher = new TokenMatcher(ImportDeclaration, $.SEQ(
  tokens.Import,

  $.OR(
    tokens.Symbol,
    tokens.StringLiteral,
  ),

  $.OPT(
    $.SEQ(
      tokens.As,
      tokens.Symbol,
    ),
  ),
));
