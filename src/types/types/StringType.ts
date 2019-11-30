import { Type } from './Type';

export class StringType extends Type {
  matches(type: Type): boolean {
    return type instanceof StringType;
  }
}
