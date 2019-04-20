import lexing from './lexing';
import parsing from './parsing';

import Indent from './Indent';
import Outdent from './Outdent';
import Program from './parsing/Program';

export default {
  ...lexing,
  ...parsing,

  Indent,
  Outdent,
  Program,
};
