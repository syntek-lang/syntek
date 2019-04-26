import Struct from '../structures/Struct';
import NumberStruct from '../structures/NumberStruct';

export default class MathHandler {
  add(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() + b.toNumber());
  }
}
