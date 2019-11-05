import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const SUPER_ERROR = "You can only use 'super' inside a class";
const STATIC_SUPER_ERROR = "You can not use 'super' in a static variable or function";

const THIS_ERROR = "You can only use 'this' inside a class";
const STATIC_THIS_ERROR = "You can not use 'this' in a static variable or function";

testRule('illegalSuperThis', {
  rules: parser,
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

    { code: 'class C { static var x = super }', errors: [STATIC_SUPER_ERROR] },
    { code: 'class C { static function x() { super } }', errors: [STATIC_SUPER_ERROR] },

    { code: 'C.super', errors: [SUPER_ERROR] },
    { code: 'if x { C.super }', errors: [SUPER_ERROR] },
    { code: 'function x() { C.super }', errors: [SUPER_ERROR] },

    { code: 'class C { static var x = C.super }', errors: [STATIC_SUPER_ERROR] },
    { code: 'class C { static function x() { C.super } }', errors: [STATIC_SUPER_ERROR] },

    // This
    { code: 'this', errors: [THIS_ERROR] },
    { code: 'if x { this }', errors: [THIS_ERROR] },
    { code: 'function x() { this }', errors: [THIS_ERROR] },

    { code: 'class C { static var x = this }', errors: [STATIC_THIS_ERROR] },
    { code: 'class C { static function x() { this } }', errors: [STATIC_THIS_ERROR] },
  ],
});
