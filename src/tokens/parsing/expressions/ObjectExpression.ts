import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import VariableDeclaration from '../declarations/VariableDeclaration';
import FunctionDeclaration from '../declarations/FunctionDeclaration';

import Indent from '../../Indent';
import Outdent from '../../Outdent';

class ObjectExpression extends Token {
  /**
   * The properties of the object
   */
  readonly properties: Token[];

  constructor(matchedTokens) {
    super(matchedTokens);

    this.properties = matchedTokens.slice(2, matchedTokens.length - 2);
  }

  build(): string {
    return '';
  }
}

export default new TokenMatcher(ObjectExpression, $.WRAPPED(
  $.SEQ(
    tokens.Lbrace,
    Indent,
  ),

  $.MANY(
    $.OR(
      VariableDeclaration,
      FunctionDeclaration,
    ),
  ),

  $.SEQ(
    Outdent,
    tokens.Rbrace,
  ),
));
