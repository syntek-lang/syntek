import { testRule } from '../rule-tester';

import { illegalRedeclaration } from '../../../src/linter/rules/declarations/illegal-redeclaration';

const ERROR = (type: string, name: string): string => `You can't declare a ${type} with the name '${name}', because it is already used`;

const VAR_ERROR = (name: string): string => ERROR('variable', name);
const PARAM_ERROR = (name: string): string => ERROR('param', name);
const FOR_ERROR = (name: string): string => ERROR('variable', name);
const CLASS_ERROR = (name: string): string => ERROR('class', name);
const GENERIC_ERROR = (name: string): string => ERROR('generic', name);
const FUNCTION_ERROR = (name: string): string => ERROR('function', name);
const OVERLOAD_ERROR = (name: string): string => `Identical function overload exists for '${name}'`;
const CONSTRUCTOR_ERROR = 'Identical constructor overload exists';

testRule('illegalRedeclaration', {
  rule: illegalRedeclaration,
  scope: true,

  valid: [
    {
      group: 'empty variable',
      tests: [
        'var x \n var y',
        'var x \n if true { var y }',
        'var x \n class A { var x }',
        'if true { var x } \n if true { var x }',
        'class A { var x \n function foo() { var x } }',
      ],
    },

    {
      group: 'variable',
      tests: [
        'var x = 5 \n var y = 10',
        'var x = 5 \n if true { var y = 10 }',
        'var x = 5 \n class A { var x = 10 }',
        'if true { var x = 5 } \n if true { var x = 5 }',
        'class A { var x = 5 \n function foo() { var x = 10 } }',
      ],
    },

    {
      group: 'function param',
      tests: [
        'function x(y: A) {}',
        'var x \n function foo(y: A) {}',
      ],
    },

    {
      group: 'for statement',
      tests: [
        'for x in y {}',
        'var x \n for y in z {}',
        'if true { var x } \n if true { for y in z {} }',
      ],
    },

    {
      group: 'class',
      tests: [
        'class A {} \n class B {}',
        'class A { var T \n function x() { var T } }',
        'class A { var x \n static var x }',
        'class A { function x() \n static function x() {} }',
        'class A<T> {} \n class B<T> {}',

        {
          group: 'constructor',
          tests: [
            'class A { new() {} }',
            'class A { new() {} \n new(x: A) {} }',
            'class A { new(x: A) {} \n new(b: B) {} }',
            'class A { new(x: Array<A>) {} \n new(b: Array<B>) {} }',
          ],
        },
      ],
    },

    {
      group: 'empty function',
      tests: [
        'function x() \n function y()',
        'var x \n class A { function x() }',
        'function x() \n function x(a: A)',
        'function x(a: A) \n function x(b: B)',
        'class A { var T \n function <T> x() }',
      ],
    },

    {
      group: 'function',
      tests: [
        'function x() {} \n function y() {}',
        'var x \n class A { function x() {} }',
        'if true { function x() {} } \n if true { function x() {} }',
        'class A { var T \n function <T> x() {} }',
        'function x() {} \n function x(a: A)',
        'function x(a: A) {} \n function x(b: B)',

        {
          group: 'generics',
          tests: [
            'function <T> x() {} \n function <T> y() {}',
            'function <A> x(a: A) {} \n function <A, B> x(b: B) {}',
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      group: 'empty variable',
      tests: [
        { code: 'var x \n var x', errors: [VAR_ERROR('x')] },
        { code: 'var x \n if true { var x }', errors: [VAR_ERROR('x')] },
        { code: 'var x \n function foo() { var x }', errors: [VAR_ERROR('x')] },
        { code: 'if true { var x } \n var x', errors: [VAR_ERROR('x')] },
        { code: 'class A { var x \n var x }', errors: [VAR_ERROR('x')] },
        { code: 'var x \n class A { function foo() { var x } }', errors: [VAR_ERROR('x')] },
        { code: 'var x \n class A { var x \n function foo() { var x } }', errors: [VAR_ERROR('x')] },
      ],
    },

    {
      group: 'variable',
      tests: [
        { code: 'var x = 5 \n var x = 10', errors: [VAR_ERROR('x')] },
        { code: 'var x = 5 \n if true { var x = 10 }', errors: [VAR_ERROR('x')] },
        { code: 'var x = 5 \n function foo() { var x = 10 }', errors: [VAR_ERROR('x')] },
        { code: 'if true { var x = 5 } \n var x = 10', errors: [VAR_ERROR('x')] },
        { code: 'class A { var x = 5 \n var x = 10 }', errors: [VAR_ERROR('x')] },
        { code: 'var x = 5 \n class A { function foo() { var x = 10 } }', errors: [VAR_ERROR('x')] },
        { code: 'var x = 5 \n class A { var x = 10 \n function foo() { var x = 15 } }', errors: [VAR_ERROR('x')] },
      ],
    },

    {
      group: 'function param',
      tests: [
        { code: 'function x(x: A)', errors: [PARAM_ERROR('x')] },
        { code: 'function x(x: A) {}', errors: [PARAM_ERROR('x')] },
        { code: 'var x \n function y(x: A) {}', errors: [PARAM_ERROR('x')] },
        { code: 'function <T> x(T: A) {}', errors: [PARAM_ERROR('T')] },
      ],
    },

    {
      group: 'for statement',
      tests: [
        { code: 'var x \n for x in y {}', errors: [FOR_ERROR('x')] },
        { code: 'for x in y {} \n var x', errors: [FOR_ERROR('x')] },
        { code: 'if true { for x in y {} } \n var x', errors: [FOR_ERROR('x')] },
      ],
    },

    {
      group: 'class',
      tests: [
        { code: 'class A {} \n class A {}', errors: [CLASS_ERROR('A')] },
        { code: 'class A { var x \n var x }', errors: [VAR_ERROR('x')] },
        { code: 'class A { static var x \n static var x }', errors: [VAR_ERROR('x')] },
        { code: 'class A<T> { var T }', errors: [VAR_ERROR('T')] },
        { code: 'var T \n class A<T> { var T }', errors: [GENERIC_ERROR('T'), VAR_ERROR('T')] },
        { code: 'class A<T> { var T } \n var T', errors: [GENERIC_ERROR('T'), VAR_ERROR('T')] },
        { code: 'class T {} \n class A<T> {}', errors: [GENERIC_ERROR('T')] },
        { code: 'class A<T> {} \n class T {}', errors: [GENERIC_ERROR('T')] },
        { code: 'class T<T> {}', errors: [GENERIC_ERROR('T')] },

        {
          group: 'constructor',
          tests: [
            { code: 'class A { new() {} \n new() {} }', errors: [CONSTRUCTOR_ERROR] },
            { code: 'class A { new(x: A) {} \n new(y: A) {} }', errors: [CONSTRUCTOR_ERROR] },
            { code: 'class A { new(x: Array<A>) {} \n new(y: Array<A>) {} }', errors: [CONSTRUCTOR_ERROR] },
            { code: 'class A { new() {} \n new(x: A) {} \n new() {} \n new(y: A) {} }', errors: [CONSTRUCTOR_ERROR, CONSTRUCTOR_ERROR] },
          ],
        },
      ],
    },

    {
      group: 'empty function',
      tests: [
        { code: 'function x() \n function x()', errors: [OVERLOAD_ERROR('x')] },
        { code: 'function x(a: A) \n function x(b: A)', errors: [OVERLOAD_ERROR('x')] },
        { code: 'var T \n class A { function <T> x() }', errors: [GENERIC_ERROR('T')] },
      ],
    },

    {
      group: 'function',
      tests: [
        { code: 'var x \n function x() {}', errors: [VAR_ERROR('x'), FUNCTION_ERROR('x')] },
        { code: 'function x() {} \n var x', errors: [VAR_ERROR('x')] },
        { code: 'function x() {} \n function x() {}', errors: [OVERLOAD_ERROR('x')] },
        { code: 'function x(a: A) {} \n function x(b: A) {}', errors: [OVERLOAD_ERROR('x')] },
        { code: 'function x() {} \n if true { function x() {} }', errors: [FUNCTION_ERROR('x')] },

        {
          group: 'generics',
          tests: [
            { code: 'function x() {} \n function <A> x() {}', errors: [OVERLOAD_ERROR('x')] },
            { code: 'function <A> x() {} \n function <B> x() {}', errors: [OVERLOAD_ERROR('x')] },
            { code: 'function <A> x(a: A) {} \n function <B> x(b: B) {}', errors: [OVERLOAD_ERROR('x')] },
            { code: 'var x \n function <A> x(a: A) {}', errors: [VAR_ERROR('x'), FUNCTION_ERROR('x')] },
            { code: 'function <T> T() {}', errors: [GENERIC_ERROR('T')] },
          ],
        },
      ],
    },
  ],
});
