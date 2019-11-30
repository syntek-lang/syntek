import { Type } from './Type';

export class NumberType extends Type {
  matches(type: Type): boolean {
    return type instanceof NumberType;
  }
}
