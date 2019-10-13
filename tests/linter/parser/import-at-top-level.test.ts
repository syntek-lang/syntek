import { testRule } from '../rule-tester';

import { importAtTopLevel } from '../../../src/linter/rules/parser/import-at-top-level';

const IMPORT = 'import myImport';
const ERROR = 'An import can only be at the top level';

testRule('importAtTopLevel', {
  rule: importAtTopLevel,
  scope: false,

  valid: [IMPORT],
  invalid: [
    { code: `if x { ${IMPORT} }`, errors: [ERROR] },
    { code: `function x() { ${IMPORT} }`, errors: [ERROR] },
    { code: `class X { ${IMPORT} }`, errors: [ERROR] },
  ],
});
