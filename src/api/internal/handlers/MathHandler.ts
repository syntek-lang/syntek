import { Struct, NumberStruct } from '../structures';

export default class MathHandler {
  /**
   * Add 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a+b`
   */
  static add(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() + b.toNumber());
  }

  /**
   * Subtracts 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a-b`
   */
  static subtract(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() - b.toNumber());
  }

  /**
   * Multiply 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a*b`
   */
  static multiply(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() * b.toNumber());
  }

  /**
   * Divide 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a/b`
   */
  static divide(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() / b.toNumber());
  }

  /**
   * Modulo 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a%b`
   */
  static modulo(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() % b.toNumber());
  }

  /**
   * Pow 2 numbers
   *
   * @param a - The left hand side
   * @param b - The right hand side
   * @returns A number structure containing the outcome of `a^b`
   */
  static pow(a: Struct, b: Struct): NumberStruct {
    return new NumberStruct(a.toNumber() ** b.toNumber());
  }
}
