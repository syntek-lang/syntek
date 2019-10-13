import { testRule } from '../rule-tester';

import { illegalRedeclaration } from '../../../src/linter/rules/declarations/illegal-redeclaration';

const VAR_ERROR = "You can't redeclare a variable";

testRule('illegalRedeclaration', {
  rule: illegalRedeclaration,
  scope: true,

  valid: [
    // Variable
    'var x = 5 \n var y = 10',
    'var x = 5 \n if true { var y = 10 }',
    'var x = 5 \n class A { var x = 10 }',
    'class A { var x = 5 \n function foo() { var x = 10 } }',
  ],
  invalid: [
    // Variable
    { code: 'var x = 5 \n var x = 10', errors: [VAR_ERROR] },
    { code: 'var x = 5 \n if true { var x = 10 }', errors: [VAR_ERROR] },
    { code: 'var x = 5 \n function foo() { var x = 10 }', errors: [VAR_ERROR] },
    { code: 'class A { var x = 5 \n var x = 10 }', errors: [VAR_ERROR] },
    { code: 'var x = 5 \n class A { function foo() { var x = 10 } }', errors: [VAR_ERROR] },
    { code: 'var x = 5 \n class A { var x = 10 \n function foo() { var x = 15 } }', errors: [VAR_ERROR] },
  ],
});
