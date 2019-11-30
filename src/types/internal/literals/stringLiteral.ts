import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { StringType } from '../../types/StringType';

export function stringLiteral(literal: grammar.StringLiteral): Type {
  return new StringType(literal);
}
