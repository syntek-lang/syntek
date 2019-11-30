import * as grammar from '../../../grammar';

import { Type } from '../../types/Type';
import { ImportType } from '../../types/ImportType';

type Import = grammar.FullImportDeclaration | grammar.PartialImportDeclaration;

export function importDecl(decl: Import): Type {
  return new ImportType(decl);
}
