import { Type } from './Type';

export class UnknownType extends Type {
  matches(): boolean {
    // Unknown type matches all other types to prevent incorrect errors
    return true;
  }
}
