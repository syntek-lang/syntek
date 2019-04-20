import { $ } from '../structures/rule';

import Body from './parsing/Body';
import Expression from './parsing/expressions/Expression';
import Declaration from './parsing/declarations/Declaration';
import Statement from './parsing/statements/Statement';

import Indent from './Indent';
import Outdent from './Outdent';

import expressions, { matchers as expressionMatchers } from './parsing/expressions';
import declarations, { matchers as declarationMatchers } from './parsing/declarations';
import statements, { matchers as statementMatchers } from './parsing/statements';

Body.setRule($.WRAPPED(
  Indent,
  $.MANY(
    $.OR(
      Expression,
      Declaration,
      Statement,
    ),
  ),
  Outdent,
));

export default {
  ...expressions,
  ...declarations,
  ...statements,
};

export const matchers = {
  // Priority
  FunctionDeclarationMatcher: declarationMatchers.FunctionDeclarationMatcher,

  // Others
  ...expressionMatchers,
  ...declarationMatchers,
  ...statementMatchers,
};
