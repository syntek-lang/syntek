import { testRule } from '../rule-tester';

import { invalidSuperThis } from '../../../src/linter/rules/parser/invalid-super-this';

const SUPER_ERROR = 'You can only use super inside a class';
const THIS_ERROR = 'You can only use this inside a class';

testRule('invalidSuperThis', invalidSuperThis, {
  valid: [
    // Super
    'class C \n\t var x = super.x',
    'class C \n\t function x() \n\t\t super',

    // This
    'class C \n\t var x = this.x',
    'class C \n\t function x() \n\t\t this',
  ],
  invalid: [
    // Super
    { code: 'super', errors: [SUPER_ERROR] },
    { code: 'if x \n\t super', errors: [SUPER_ERROR] },
    { code: 'function x() \n\t super', errors: [SUPER_ERROR] },
    { code: 'switch x \n\t case y \n\t\t super', errors: [SUPER_ERROR] },

    // This
    { code: 'this', errors: [THIS_ERROR] },
    { code: 'if x \n\t this', errors: [THIS_ERROR] },
    { code: 'function x() \n\t this', errors: [THIS_ERROR] },
    { code: 'switch x \n\t case y \n\t\t this', errors: [THIS_ERROR] },
  ],
});
