import { $ } from '../../../structures/rule';
import { Token, TokenMatcher, DeclarationToken } from '../../../structures/token';

import tokens from '../../lexing';

import { VariableDeclaration } from './VariableDeclaration';
import { FunctionDeclaration } from './FunctionDeclaration';

import Indent from '../../Indent';
import Outdent from '../../Outdent';

export class ClassDeclaration extends DeclarationToken {
  /**
   * The body of the class
   */
  readonly body: { isStatic: boolean, token: Token }[] = [];

  constructor(location, matchedTokens) {
    super(matchedTokens[1], location, matchedTokens);

    // Add body
    let i = 1;
    while (i < matchedTokens[2].length - 1) {
      let isStatic = false;

      if (matchedTokens[2][i] instanceof tokens.Static) {
        isStatic = true;
        i += 1;
      }

      this.body.push({ isStatic, token: matchedTokens[2][i] });
      i += 1;
    }
  }

  build(): string {
    return '';
  }
}

export const ClassDeclarationMatcher = new TokenMatcher(ClassDeclaration, $.SEQ(
  tokens.Class,
  tokens.Symbol,

  $.WRAPPED(
    Indent,

    $.MANY(
      $.SEQ(
        $.OPT(tokens.Static),
        $.OR(
          VariableDeclaration,
          FunctionDeclaration,
        ),
      ),
    ),

    Outdent,
  ),
));
