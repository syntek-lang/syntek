import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { FunctionType } from '../../types/FunctionType';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

export function functionDecl(decl: Func): Type {
  return new FunctionType(decl);
}
