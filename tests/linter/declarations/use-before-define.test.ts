import { testRule } from '../rule-tester';

import * as declarations from '../../../src/linter/rules/declarations';

const ERROR = (name: string): string => `'${name}' is used before its declaration`;

testRule('useBeforeDefine', {
  rules: declarations,
  scope: true,

  valid: [
    'var x = 5 \n x',
    'var x = 5 \n x = 10',
    'var x = 5 \n if true { x }',
    'if true { var x = 5 \n x }',

    'function x(y: Number) { y }',
    'var x = 5 \n function y() { x }',
    'function x() { y } \n var y = 5',
    'function x() { if true { y } } \n var y = 5',
    'function x() {} \n x()',
    'x() \n function x() {}',
    'function x() { x() }',

    'class A {} \n new A()',
    'var x = 5 \n class A { var x = x }',
    'var x = 5 \n class A { static var x = x }',
    'class A { var x = x } \n var x = 5',

    'class A { var x = 5 \n var y = this.x }',
    'class A { static var x = 5 \n static var y = A.x }',
  ],
  invalid: [
    { code: 'var x = x', errors: [ERROR('x')] },
    { code: 'var x = x + 5', errors: [ERROR('x')] },
    { code: 'var x = 5 + x', errors: [ERROR('x')] },

    { code: 'x \n var x = 5', errors: [ERROR('x')] },
    { code: 'x = 10 \n var x = 5', errors: [ERROR('x')] },
    { code: 'var x = y \n var y = x', errors: [ERROR('y')] },
    { code: 'if true { x } \n var x = 5', errors: [ERROR('x')] },
    { code: 'if true { x \n var x = 5 }', errors: [ERROR('x')] },
    { code: 'for x in y {} \n var y = 5', errors: [ERROR('y')] },

    { code: 'new A() \n class A {}', errors: [ERROR('A')] },
    { code: 'class A { static var x = x } \n var x = A.x', errors: [ERROR('x')] },
    { code: 'var x = A.x \n class A { static var x = x }', errors: [ERROR('A')] },

    { code: 'class A { var x = this.x }', errors: [ERROR('x')] },
    { code: 'class A { var x = 5 + this.x }', errors: [ERROR('x')] },
    { code: 'class A { var x = this.y \n var y = 5 }', errors: [ERROR('y')] },

    { code: 'class A { static var x = A.x }', errors: [ERROR('x')] },
    { code: 'class A { static var x = 5 + A.x }', errors: [ERROR('x')] },
    { code: 'class A { static var x = A.y \n static var y = 5 }', errors: [ERROR('y')] },
  ],
});
