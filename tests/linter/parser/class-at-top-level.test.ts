import { testRule } from '../rule-tester';

import { classAtTopLevel } from '../../../src/linter/rules/parser/class-at-top-level';

const CLASS = 'class MyClass { var _ }';
const ERROR = 'A class can only be declared at the top level';

testRule('classAtTopLevel', {
  rule: classAtTopLevel,
  scope: false,

  valid: [CLASS],
  invalid: [
    { code: `if x { ${CLASS} }`, errors: [ERROR] },
    { code: `function x() { ${CLASS} }`, errors: [ERROR] },
    { code: `class X { ${CLASS} }`, errors: [ERROR] },
    { code: `function x() { class Y { ${CLASS} } }`, errors: [ERROR, ERROR] },
  ],
});
