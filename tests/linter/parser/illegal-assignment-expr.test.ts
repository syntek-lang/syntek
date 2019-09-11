import { testRule } from '../rule-tester';

import { illegalAssignmentExpr } from '../../../src/linter/rules/parser/illegal-assignment-expr';

const EXPR_ERROR = 'Assignments can not be inside another expression';
const LEFT_ERROR = 'You can only assign to an identifier, member expression, and index expression';

testRule('illegalAssignmentExpr', illegalAssignmentExpr, {
  valid: [
    'x = 5',
    'x = 10 - 5',
    'if x \n\t x = 5',
    'function x() \n\t x = 5',
    'switch x \n\t case y \n\t\t x = 5',
    'class C \n\t function x() \n\t\t x = 5',

    'obj.x = 5',
    'array[0] = 5',
    'if x \n\t obj.x = 5',
    'if x \n\t array[0] = 5',
  ],
  invalid: [
    { code: '(x = 5)', errors: [EXPR_ERROR] },
    { code: 'if x = 5 \n\t y', errors: [EXPR_ERROR] },
    { code: 'for x in y = 5 \n\t z', errors: [EXPR_ERROR] },

    { code: 'x + y = 5', errors: [LEFT_ERROR] },
    { code: 'fn() = 5', errors: [LEFT_ERROR] },
    { code: '(x) = 5', errors: [LEFT_ERROR] },
    { code: 'async x = 5', errors: [LEFT_ERROR] },

    { code: '((x) = 5)', errors: [EXPR_ERROR, LEFT_ERROR] },
  ],
});
