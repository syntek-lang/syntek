import { Type } from './Type';

export class ImportType extends Type {
  matches(): boolean {
    // An import never matches another type
    return false;
  }
}
