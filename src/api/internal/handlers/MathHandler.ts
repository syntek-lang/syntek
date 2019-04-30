import { Struct, NumberStruct } from '../structures';

export default class MathHandler {
  /**
   * Add 2 numbers together
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the sum of a and b
   */
  static add(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() + b.toNumber());
  }
}
