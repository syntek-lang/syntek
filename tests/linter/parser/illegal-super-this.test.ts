import { testRule } from '../rule-tester';

import { illegalSuperThis } from '../../../src/linter/rules/parser/illegal-super-this';

const SUPER_ERROR = 'You can only use super inside a class';
const THIS_ERROR = 'You can only use this inside a class';

testRule('illegalSuperThis', {
  rule: illegalSuperThis,
  scope: false,

  valid: [
    // Super
    'class C { var x = super.x }',
    'class C { function x() { super } }',

    'class C { var x = C.super }',
    'class C { function x() { C.super } }',

    // This
    'class C { var x = this.x }',
    'class C { function x() { this } }',
  ],
  invalid: [
    // Super
    { code: 'super', errors: [SUPER_ERROR] },
    { code: 'if x { super }', errors: [SUPER_ERROR] },
    { code: 'function x() { super }', errors: [SUPER_ERROR] },
    { code: 'switch x { case y { super } }', errors: [SUPER_ERROR] },

    { code: 'C.super', errors: [SUPER_ERROR] },
    { code: 'if x { C.super }', errors: [SUPER_ERROR] },
    { code: 'function x() { C.super }', errors: [SUPER_ERROR] },
    { code: 'switch x { case y { C.super } }', errors: [SUPER_ERROR] },

    // This
    { code: 'this', errors: [THIS_ERROR] },
    { code: 'if x { this }', errors: [THIS_ERROR] },
    { code: 'function x() { this }', errors: [THIS_ERROR] },
    { code: 'switch x { case y { this } }', errors: [THIS_ERROR] },
  ],
});
