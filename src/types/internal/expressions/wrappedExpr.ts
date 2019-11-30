import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { TypeChecker } from '../../TypeChecker';

export function wrappedExpr(expr: grammar.WrappedExpression, checker: TypeChecker): Type {
  return checker.getType(expr.expression);
}
