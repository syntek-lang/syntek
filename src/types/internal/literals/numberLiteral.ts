import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { NumberType } from '../../types/NumberType';

export function numberLiteral(literal: grammar.NumberLiteral): Type {
  return new NumberType(literal);
}
