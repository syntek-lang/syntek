import { Struct, NumberStruct } from '../structures';

export default class MathHandler {
  add(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() + b.toNumber());
  }
}
