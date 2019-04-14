import { $ } from '../../../structures/rule';
import { Token, TokenMatcher } from '../../../structures/token';

import tokens from '../../lexing';

import VariableDeclaration from './VariableDeclaration';
import FunctionDeclaration from './FunctionDeclaration';

import Indent from '../../Indent';
import Outdent from '../../Outdent';

class ClassDeclaration extends Token {
  build(): string {
    return '';
  }
}

export default new TokenMatcher(ClassDeclaration, $.SEQ(
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
