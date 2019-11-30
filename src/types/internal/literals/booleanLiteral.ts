import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { BooleanType } from '../../types/BooleanType';

export function booleanLiteral(literal: grammar.BooleanLiteral): Type {
  return new BooleanType(literal);
}
