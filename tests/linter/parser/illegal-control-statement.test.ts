import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const RETURN_ERROR = 'You can only place return inside a function';
const IF_RETURN_ERROR = 'You can not return from an if expression';
const YIELD_ERROR = 'You can only place yield inside an if expression';
const BREAK_ERROR = 'You can only place break inside a loop';
const CONTINUE_ERROR = 'You can only place continue inside a loop';

testRule('illegalControlStatement', {
  rules: parser,
  scope: false,

  valid: [
    // Return
    'function x() { return }',
    'function x() { if y { return } }',
    'if x { function x() { return } }',
    'class C { function x() { return } }',

    // Yield
    'var a = if b { yield c } else { yield d }',
    'for a in if b { yield c } else { yield d } {}',
    '(if a { yield if b { yield c } else { yield d } } else { yield e })',

    // Break
    'for x in y { break }',
    'for x in y { if z { break } }',
    'if x { for y in z { break } }',

    // Continue
    'for x in y { continue }',
    'for x in y { if z { continue } }',
    'if x { for y in z { continue } }',
  ],
  invalid: [
    // Return
    { code: 'return', errors: [RETURN_ERROR] },
    { code: 'if x { return }', errors: [RETURN_ERROR] },
    { code: 'for x in y { return }', errors: [RETURN_ERROR] },

    { code: '(if x { return y } else { yield z })', errors: [IF_RETURN_ERROR] },
    { code: 'function a() { return if b { return c } else { yield d } }', errors: [IF_RETURN_ERROR] },

    // Yield
    { code: 'yield x', errors: [YIELD_ERROR] },
    { code: 'for x in y { yield z }', errors: [YIELD_ERROR] },
    { code: 'if x { yield y }', errors: [YIELD_ERROR] },
    { code: 'if x { yield y } else { yield z }', errors: [YIELD_ERROR, YIELD_ERROR] },
    { code: 'if a { yield if b { yield c } else { yield d } } else { yield e }', errors: [YIELD_ERROR, YIELD_ERROR] },

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
