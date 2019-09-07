import { testRule } from '../rule-tester';

import { declarationsInClass } from '../../../src/linter/rules/parser/declarations-in-class';

const ERROR = 'You can only put declarations in a class body';

testRule('declarationsInClass', declarationsInClass, {
  valid: [
    'class X \n\t var x',
    'class X \n\t var x = 5',
    'class X \n\t function x() \n\t\t return',
    'class X \n\t import x',
    'class X \n\t class Y \n\t\t var x',
  ],
  invalid: [
    { code: 'class X \n\t 5', errors: [ERROR] },
    { code: 'class X \n\t x = 5', errors: [ERROR] },
    { code: 'class X \n\t new X()', errors: [ERROR] },
    { code: 'class X \n\t if x \n\t\t y', errors: [ERROR] },
    { code: 'class X \n\t for x in y \n\t\t z', errors: [ERROR] },
    { code: 'class X \n\t x \n\t y', errors: [ERROR, ERROR] },
  ],
});
