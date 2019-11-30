import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { ClassType } from '../../types/ClassType';

export function classDecl(decl: grammar.ClassDeclaration): Type {
  return new ClassType(decl);
}
