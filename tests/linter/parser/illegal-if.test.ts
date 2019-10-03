import { testRule } from '../rule-tester';

import { illegalIf } from '../../../src/linter/rules/parser/illegal-if';

const ERROR = 'An if expression must have an else body';

testRule('illegalIf', illegalIf, {
  valid: [
    'if x {}',
    'if x {} else {}',
    '(if x {} else {})',
    'if if x {} else {} {}',
    'for x in if y {} else {} {}',
  ],
  invalid: [
    { code: '(if x {})', errors: [ERROR] },
    { code: 'if if x {} {}', errors: [ERROR] },
    { code: 'for x in if y {} {}', errors: [ERROR] },
  ],
});
