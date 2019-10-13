import { testRule } from '../rule-tester';

import { illegalControlStatement } from '../../../src/linter/rules/parser/illegal-control-statement';

const RETURN_ERROR = 'You can only place return inside a function';
const YIELD_ERROR = 'You can only place yield inside an if expression';
const BREAK_ERROR = 'You can only place break inside a loop or switch case';
const CONTINUE_ERROR = 'You can only place continue inside a loop or switch case';

testRule('illegalControlStatement', {
  rule: illegalControlStatement,
  scope: false,

  valid: [
    // Return
    'function x() { return }',
    'function x() { if y { return } }',
    'if x { function x() { return } }',
    'class C { function x() { return } }',

    // Yield
    'if x { yield y }',
    'if x { yield y } else { yield z }',
    'function x() { if y { yield z } }',
    'for x in y { if z { yield a } }',

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

    // Yield
    { code: 'yield x', errors: [YIELD_ERROR] },
    { code: 'for x in y { yield z }', errors: [YIELD_ERROR] },
    { code: 'switch x { case y { yield z } }', errors: [YIELD_ERROR] },

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
