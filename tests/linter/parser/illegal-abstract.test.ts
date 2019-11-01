import { testRule } from '../rule-tester';

import * as parser from '../../../src/linter/rules/parser';

const CLASS_ERROR = 'Only abstract classes can contain abstract properties';
const PROP_ERROR = 'An abstract property can not contain a value';

testRule('illegalAbstract', {
  rules: parser,
  scope: false,

  valid: [
    'abstract class A { abstract var x: A \n abstract function y() }',
    'abstract class A { abstract static var x: A \n abstract static function y() }',
    'abstract class A { var x = 5 \n abstract var y: A }',
    'abstract class A { function x() {} \n abstract function y() }',
  ],
  invalid: [
    // Class
    { code: 'class A { abstract var x: A }', errors: [CLASS_ERROR] },
    { code: 'class A { abstract function x() }', errors: [CLASS_ERROR] },

    // Prop
    { code: 'abstract class A { abstract var x = 5 }', errors: [PROP_ERROR] },
    { code: 'abstract class A { abstract function x() {} }', errors: [PROP_ERROR] },

    // Combined
    { code: 'class A { abstract var x = 5 }', errors: [CLASS_ERROR, PROP_ERROR] },
    { code: 'class A { abstract function x() {} }', errors: [CLASS_ERROR, PROP_ERROR] },
  ],
});
