import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const IMPORT = 'import myImport';
const ERROR = 'An import can only be at the top level';

testRule('importAtTopLevel', {
  rules: parser,
  scope: false,

  valid: [IMPORT],
  invalid: [
    { code: `if x { ${IMPORT} }`, errors: [ERROR] },
    { code: `function x() { ${IMPORT} }`, errors: [ERROR] },
    { code: `class X { ${IMPORT} }`, errors: [ERROR] },
  ],
});
