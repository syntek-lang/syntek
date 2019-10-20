import 'mocha';
import { expect } from 'chai';

import { Linter } from '../../src/linter/Linter';
import { LinterRule } from '../../src/linter/LinterRule';

import { BlockScope } from '../../src/scope';
import { parse, sanitize } from '../test-utils';

type ValidTest =
  string
  | {
    code: string;
    skip: boolean;
  }
  | {
    group: string;
    tests: ValidTest[];
  };

type InvalidTest =
  {
    code: string;
    errors: string[];
    skip?: boolean;
  }
  | {
    group: string;
    tests: InvalidTest[];
  };

interface TestSettings {
  rule: LinterRule;
  scope: boolean;

  valid: ValidTest[];
  invalid: InvalidTest[];
}

export function testRule(name: string, settings: TestSettings): void {
  function lintCode(code: string): string[] {
    const program = parse(code);

    let scope: BlockScope | undefined;
    if (settings.scope) {
      scope = new BlockScope(program);
      scope.build();
    }

    return new Linter(program, { [name]: settings.rule }, scope)
      .lint()
      .map(error => error.msg);
  }

  describe(name, () => {
    describe('valid', () => {
      function runValidTest(valid: ValidTest): void {
        let code: string;
        let skip = false;

        if (typeof valid === 'string') {
          code = valid;
        } else if ('code' in valid) {
          code = valid.code;
          skip = valid.skip;
        } else {
          describe(valid.group, () => {
            valid.tests.forEach(runValidTest);
          });

          return;
        }

        const test = skip ? it.skip : it;

        test(sanitize(code), () => {
          lintCode(code)
            .forEach((error) => {
              // Any error throws as the code should be valid
              throw new Error(error);
            });
        });
      }

      settings.valid.forEach(runValidTest);
    });

    describe('invalid', () => {
      function runInvalidTest(invalid: InvalidTest): void {
        if ('code' in invalid) {
          const test = invalid.skip ? it.skip : it;

          test(sanitize(invalid.code), () => {
            const errors = lintCode(invalid.code);

            expect(errors.length).to.equal(invalid.errors.length, `Expected ${invalid.errors.length} error${invalid.errors.length === 1 ? '' : 's'}, but got ${errors.length}`);

            errors.forEach((error) => {
              // The error should be in the list of expected errors
              expect(invalid.errors).to.include(error);
            });
          });
        } else {
          describe(invalid.group, () => {
            invalid.tests.forEach(runInvalidTest);
          });
        }
      }

      settings.invalid.forEach(runInvalidTest);
    });
  });
}
