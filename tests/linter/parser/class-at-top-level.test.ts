import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const CLASS = 'class MyClass { var x = 5 }';
const ERROR = 'A class can only be declared at the top level';

testRule('classAtTopLevel', {
  rules: parser,
  scope: false,

  valid: [CLASS],
  invalid: [
    { code: `if x { ${CLASS} }`, errors: [ERROR] },
    { code: `function x() { ${CLASS} }`, errors: [ERROR] },
    { code: `class X { ${CLASS} }`, errors: [ERROR] },
    { code: `function x() { class Y { ${CLASS} } }`, errors: [ERROR, ERROR] },
  ],
});
