import { $ } from '../structures/rule';

import Body from './parsing/Body';
import Declaration from './parsing/declarations/Declaration';
import Expression from './parsing/expressions/Expression';
import Statement from './parsing/statements/Statement';

import Indent from './Indent';
import Outdent from './Outdent';

import declarations from './parsing/declarations';
import expressions from './parsing/expressions';
import statements from './parsing/statements';

Body.setRule($.WRAPPED(
  Indent,
  $.MANY(
    $.OR(
      Declaration,
      Expression,
      Statement,
    ),
  ),
  Outdent,
));

export default {
  // Priority
  FunctionDeclaration: declarations.FunctionDeclaration,

  // Others
  ...declarations,
  ...expressions,
  ...statements,
};
