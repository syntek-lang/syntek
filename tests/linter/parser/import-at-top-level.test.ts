import { testRule } from '../rule-tester';

import { importAtTopLevel } from '../../../src/linter/rules/parser/import-at-top-level';

const IMPORT = 'import myImport';
const ERROR = 'An import can only be at the top level';

testRule('importAtTopLevel', importAtTopLevel, {
  valid: [IMPORT],
  invalid: [
    { code: `if x \n\t ${IMPORT}`, errors: [ERROR] },
    { code: `function x() \n\t ${IMPORT}`, errors: [ERROR] },
    { code: `class X \n\t ${IMPORT}`, errors: [ERROR] },
  ],
});
