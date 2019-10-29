import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const EXPR_ERROR = 'Assignments can not be inside another expression';
const LEFT_ERROR = 'You can only assign to an identifier, member expression, and index expression';

testRule('illegalAssignmentExpr', {
  rules: parser,
  scope: false,

  valid: [
    'x = 5',
    'x = 10 - 5',
    'if x { x = 5 }',
    'function x() { x = 5 }',
    'class C { function x() { x = 5 } }',

    'obj.x = 5',
    'array[0] = 5',
    'if x { obj.x = 5 }',
    'if x { array[0] = 5 }',
  ],
  invalid: [
    { code: '(x = 5)', errors: [EXPR_ERROR] },
    { code: 'if x = 5 { y }', errors: [EXPR_ERROR] },
    { code: 'for x in y = 5 { z }', errors: [EXPR_ERROR] },

    { code: 'x + y = 5', errors: [LEFT_ERROR] },
    { code: 'fn() = 5', errors: [LEFT_ERROR] },
    { code: '(x) = 5', errors: [LEFT_ERROR] },
    { code: 'async x = 5', errors: [LEFT_ERROR] },

    { code: '((x) = 5)', errors: [EXPR_ERROR, LEFT_ERROR] },
  ],
});
