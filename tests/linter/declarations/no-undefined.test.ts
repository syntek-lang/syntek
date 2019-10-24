import { testRule } from '../rule-tester';

import * as declarations from '../../../src/linter/rules/declarations';

const ERROR = (name: string): string => `No symbol with the name '${name}'`;

testRule('noUndefined', {
  rules: declarations,
  scope: true,

  valid: [
    {
      group: 'declarations',
      tests: [
        // Variable
        'var x \n var y = x',
      ],
    },

    {
      group: 'expressions',
      tests: [
        // Assignment
        'var x \n x = x',

        // Wrapped
        'var x \n (x)',

        // Unary
        'var x \n -x',
        'var x \n !x',

        // Binary
        'var x \n x + 5',
        'var x \n 5 + x',
        'var x \n x + x',

        // Call
        'var x \n x()',
        'var x \n var y \n x(y)',

        // Index
        'var x \n x[0]',
        'var x \n var y \n x[y]',

        // Member
        'var x \n x.y',

        // New
        'var x \n new x()',
        'var x \n new x.y()',
        'var x \n var y \n new x(y)',
        'var x \n var y \n new x.y(y)',

        // Instanceof
        'var x \n var y \n x instanceof y',

        // Async
        'var x \n async x',

        // Array
        '[]',
        'var x \n [x]',
        'var x \n var y \n [x, y]',

        // If
        'var x \n if x {}',
        'var x \n if x {} else {}',
        'var x \n var y \n if x {} else if y {}',
        'var x \n var y \n if x {} else if y {} else {}',
      ],
    },

    {
      group: 'statements',
      tests: [
        // For
        'var x \n for y in x {}',

        // While
        'var x \n while x {}',

        // Return
        'return',
        'var x \n return x',

        // Yield
        'var x \n yield x',

        // Expression
        'var x \n x',
      ],
    },

    {
      group: 'other',
      tests: [
        // VariableType
        'var A \n var y: A',
        'var A \n function x(y: A) {}',
        'function <T> x(y: T) {}',
        'var A \n function x(): A {}',
        'class A<T> { var x: T }',
      ],
    },
  ],
  invalid: [
    {
      group: 'declarations',
      tests: [
        // Variable
        { code: 'var x = y', errors: [ERROR('y')] },
      ],
    },

    {
      group: 'expressions',
      tests: [
        // Assignment
        { code: 'x = 5', errors: [ERROR('x')] },
        { code: 'var x \n x = y', errors: [ERROR('y')] },
        { code: 'x = y', errors: [ERROR('x'), ERROR('y')] },

        // Wrapped
        { code: '(x)', errors: [ERROR('x')] },

        // Unary
        { code: '-x', errors: [ERROR('x')] },
        { code: '!x', errors: [ERROR('x')] },

        // Binary
        { code: 'x + 5', errors: [ERROR('x')] },
        { code: '5 + x', errors: [ERROR('x')] },
        { code: 'x + x', errors: [ERROR('x'), ERROR('x')] },

        // Call
        { code: 'x()', errors: [ERROR('x')] },
        { code: 'var x \n x(y)', errors: [ERROR('y')] },
        { code: 'x(y)', errors: [ERROR('x'), ERROR('y')] },
        { code: 'x(y, z)', errors: [ERROR('x'), ERROR('y'), ERROR('z')] },

        // Index
        { code: 'x[0]', errors: [ERROR('x')] },
        { code: 'var x \n x[y]', errors: [ERROR('y')] },
        { code: 'x[y]', errors: [ERROR('x'), ERROR('y')] },

        // Member
        { code: 'x.y', errors: [ERROR('x')] },
        { code: 'x.y.z', errors: [ERROR('x')] },

        // New
        { code: 'new x()', errors: [ERROR('x')] },
        { code: 'var x \n new x(y)', errors: [ERROR('y')] },
        { code: 'new x(y)', errors: [ERROR('x'), ERROR('y')] },
        { code: 'new x(y, z)', errors: [ERROR('x'), ERROR('y'), ERROR('z')] },

        // Instanceof
        { code: 'var x \n x instanceof y', errors: [ERROR('y')] },
        { code: 'var y \n x instanceof y', errors: [ERROR('x')] },
        { code: 'x instanceof y', errors: [ERROR('x'), ERROR('y')] },

        // Async
        { code: 'async x', errors: [ERROR('x')] },

        // Array
        { code: '[x]', errors: [ERROR('x')] },
        { code: '[x, y]', errors: [ERROR('x'), ERROR('y')] },

        // If
        { code: 'if x {}', errors: [ERROR('x')] },
        { code: 'if x {} else {}', errors: [ERROR('x')] },
        { code: 'if x {} else if y {}', errors: [ERROR('x'), ERROR('y')] },
        { code: 'if x {} else if y {} else {}', errors: [ERROR('x'), ERROR('y')] },
        { code: 'var x \n if x {} else if y {} else {}', errors: [ERROR('y')] },
      ],
    },

    {
      group: 'statements',
      tests: [
        // For
        { code: 'for x in y {}', errors: [ERROR('y')] },

        // While
        { code: 'while x {}', errors: [ERROR('x')] },

        // Return
        { code: 'return x', errors: [ERROR('x')] },

        // Yield
        { code: 'yield x', errors: [ERROR('x')] },

        // Expression
        { code: 'x', errors: [ERROR('x')] },
      ],
    },

    {
      group: 'other',
      tests: [
        { code: 'var x: A', errors: [ERROR('A')] },
        { code: 'var x: A = 5', errors: [ERROR('A')] },
        { code: 'function x(y: A) {}', errors: [ERROR('A')] },
        { code: 'function x(y: A, z: B) {}', errors: [ERROR('A'), ERROR('B')] },
        { code: 'function x(): A {}', errors: [ERROR('A')] },
        { code: 'class A<T> { static var x: T }', errors: [ERROR('T')] },
      ],
    },
  ],
});
