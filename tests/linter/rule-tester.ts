import 'mocha';
import { expect } from 'chai';

import { Linter } from '../../src/linter/Linter';
import { LinterRule } from '../../src/linter/LinterRule';

import { parse, sanitize } from '../test-utils';

interface TestCases {
  valid: string[];
  invalid: {
    code: string;
    errors: string[];
  }[];
}

export function testRule(name: string, rule: LinterRule, testCases: TestCases): void {
  function lintCode(code: string): string[] {
    return new Linter(parse(code), { [name]: rule })
      .lint()
      .map(error => error.msg);
  }

  describe(name, () => {
    describe('valid', () => {
      testCases.valid.forEach((valid) => {
        it(sanitize(valid), () => {
          lintCode(valid)
            .forEach((error) => {
              // Any error throws as the code should be valid
              throw new Error(error);
            });
        });
      });
    });

    describe('invalid', () => {
      testCases.invalid.forEach((invalid) => {
        it(sanitize(invalid.code), () => {
          const errors = lintCode(invalid.code);

          expect(errors.length).to.equal(invalid.errors.length, `Expected ${invalid.errors.length} error${invalid.errors.length === 1 ? '' : 's'}, but got ${errors.length}`);

          errors.forEach((error) => {
            // The error should be in the list of expected errors
            expect(invalid.errors).to.include(error);
          });
        });
      });
    });
  });
}
