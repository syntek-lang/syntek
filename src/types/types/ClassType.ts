import { Type } from './Type';

export class ClassType extends Type {
  matches(): boolean {
    // A class never matches another type
    return false;
  }
}
