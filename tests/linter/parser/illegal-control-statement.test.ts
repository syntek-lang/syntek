import { testRule } from '../rule-tester';

import { illegalControlStatement } from '../../../src/linter/rules/parser/illegal-control-statement';

const RETURN_ERROR = 'You can only place return inside a function';
const BREAK_ERROR = 'You can only place break inside a loop or switch case';
const CONTINUE_ERROR = 'You can only place continue inside a loop or switch case';

testRule('illegalControlStatement', illegalControlStatement, {
  valid: [
    // Return
    'function x() { return }',
    'function x() { if y { return } }',
    'if x { function x() { return } }',
    'class C { function x() { return } }',

    // Break
    'for x in y { break }',
    'for x in y { if z { break } }',
    'if x { for y in z { break } }',
    'switch x { case y { break } }',

    // Continue
    'for x in y { continue }',
    'for x in y { if z { continue } }',
    'if x { for y in z { continue } }',
    'switch x { case y { continue } }',
  ],
  invalid: [
    // Return
    { code: 'return', errors: [RETURN_ERROR] },
    { code: 'if x { return }', errors: [RETURN_ERROR] },
    { code: 'for x in y { return }', errors: [RETURN_ERROR] },
    { code: 'switch x { case y { return } }', errors: [RETURN_ERROR] },

    // Break
    { code: 'break', errors: [BREAK_ERROR] },
    { code: 'if x { break }', errors: [BREAK_ERROR] },
    { code: 'function x() { break }', errors: [BREAK_ERROR] },

    // Continue
    { code: 'continue', errors: [CONTINUE_ERROR] },
    { code: 'if x { continue }', errors: [CONTINUE_ERROR] },
    { code: 'function x() { continue }', errors: [CONTINUE_ERROR] },
  ],
});
