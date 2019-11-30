import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { TypeChecker } from '../../TypeChecker';

import { NumberType } from '../../types/NumberType';
import { BooleanType } from '../../types/BooleanType';

export function unaryExpr(expr: grammar.UnaryExpression, checker: TypeChecker): Type {
  const right = checker.getType(expr.right);

  // -
  if (expr.operator.type === grammar.LexicalToken.MINUS) {
    if (!(right instanceof NumberType)) {
      checker.error(`Expected right side of '${expr.operator.lexeme}' to be a number`, expr.right.span);
    }

    return new NumberType(expr);
  }

  // !
  if (!(right instanceof BooleanType)) {
    checker.error(`Expected right side of '${expr.operator.lexeme}' to be a boolean`, expr.right.span);
  }

  return new BooleanType(expr);
}
