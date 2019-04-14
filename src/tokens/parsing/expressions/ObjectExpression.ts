import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';
import VariableDeclaration from '../declarations/VariableDeclaration';
import FunctionDeclaration from '../declarations/FunctionDeclaration';

import Indent from '../../Indent';
import Outdent from '../../Outdent';

class ObjectExpression extends Token {
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
