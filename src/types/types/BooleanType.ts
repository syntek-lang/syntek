import { Type } from './Type';

export class BooleanType extends Type {
  matches(type: Type): boolean {
    return type instanceof BooleanType;
  }
}
