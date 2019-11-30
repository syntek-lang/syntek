import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { TypeChecker } from '../../TypeChecker';

type Variable = grammar.VariableDeclaration | grammar.EmptyVariableDeclaration;

export function variableDecl(decl: Variable, checker: TypeChecker): Type {
  if (decl instanceof grammar.VariableDeclaration) {
    if (decl.variableType) {
      const expected = checker.getType(decl.variableType);
      const value = checker.getType(decl.value);

      if (!value.matches(expected)) {
        checker.error(`Expected ${value} to be ${expected}`, decl.span);
      }

      return expected;
    }

    return checker.getType(decl.value);
  }

  return checker.getType(decl.variableType);
}
