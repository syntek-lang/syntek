import { testRule } from '../rule-tester';

import { classAtTopLevel } from '../../../src/linter/rules/parser/class-at-top-level';

const CLASS = (depth: number): string => `class MyClass \n${'\t'.repeat(depth + 1)} var _`;
const ERROR = 'A class can only be declared at the top level';

testRule('classAtTopLevel', classAtTopLevel, {
  valid: [CLASS(0)],
  invalid: [
    { code: `if x \n\t ${CLASS(1)}`, errors: [ERROR] },
    { code: `function x() \n\t ${CLASS(1)}`, errors: [ERROR] },
    { code: `class X \n\t ${CLASS(1)}`, errors: [ERROR] },
    { code: `function x() \n\t class Y \n\t\t ${CLASS(2)}`, errors: [ERROR, ERROR] },
  ],
});
