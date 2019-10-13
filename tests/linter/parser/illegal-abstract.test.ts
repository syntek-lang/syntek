import { testRule } from '../rule-tester';

import { illegalAbstract } from '../../../src/linter/rules/parser/illegal-abstract';

const CLASS_ERROR = 'Only abstract classes can contain abstract properties';
const PROP_ERROR = 'An abstract property can not contain a value';

testRule('illegalAbstract', {
  rule: illegalAbstract,
  scope: false,

  valid: [
    'abstract class A { abstract var x \n abstract function y() }',
    'abstract class A { abstract static var x \n abstract static function y() }',
    'abstract class A { var x = 5 \n abstract var y }',
    'abstract class A { function x() {} \n abstract function y() }',
  ],
  invalid: [
    // Class
    { code: 'class A { abstract var x }', errors: [CLASS_ERROR] },
    { code: 'class A { abstract function x() }', errors: [CLASS_ERROR] },

    // Prop
    { code: 'abstract class A { abstract var x = 5 }', errors: [PROP_ERROR] },
    { code: 'abstract class A { abstract function x() {} }', errors: [PROP_ERROR] },

    // Combined
    { code: 'class A { abstract var x = 5 }', errors: [CLASS_ERROR, PROP_ERROR] },
    { code: 'class A { abstract function x() {} }', errors: [CLASS_ERROR, PROP_ERROR] },
  ],
});
