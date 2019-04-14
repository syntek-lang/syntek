import { $ } from '../structures/rule';

import Body from './parsing/Body';
import Expression from './parsing/expressions/Expression';
import Declaration from './parsing/declarations/Declaration';
import Statement from './parsing/statements/Statement';

import Indent from './Indent';
import Outdent from './Outdent';

import expressions from './parsing/expressions';
import declarations from './parsing/declarations';
import statements from './parsing/statements';

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
  // Priority
  FunctionDeclaration: declarations.FunctionDeclaration,

  // Others
  ...expressions,
  ...declarations,
  ...statements,
};
