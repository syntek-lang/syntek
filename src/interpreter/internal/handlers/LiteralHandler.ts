import * as structures from '../structures';

export default class LiteralHandler {
  /**
   * Create a new number
   *
   * @param value - The numeric value
   * @returns A number structure
   */
  static number(value: number): structures.Struct {
    return new structures.NumberStruct(value);
  }

  /**
   * Create a new function
   *
   * @param context - The context the function is in
   * @param name - The name of the function
   * @param parameters - A list of parameters the function receives
   * @param body - The body of the function that is executed when the function is called
   * @param returnType - The return type of the function
   * @returns A function structure
   */
  static function(
    context: structures.Context,
    name: string,
    parameters: structures.FunctionParameterList,
    body: structures.AnyContextCallback,
    returnType: structures.DataType,
  ): structures.Struct {
    return new structures.FunctionStruct(context, name, parameters, body, returnType);
  }

  /**
   * Create a new object
   *
   * @param outerContext - The context outside of the object
   * @param objectBuilder - A function that builds the object. Called immediately
   * @returns An object structure
   */
  static object(
    outerContext: structures.Context,
    objectBuilder: structures.VoidContextCallback,
  ): structures.Struct {
    return new structures.ObjectStruct(outerContext, objectBuilder);
  }

  /**
   * Create a new class
   *
   * @param outerContext - The context outside of the class
   * @param name - The name of the class
   * @param staticBuilder - A function that builds the static side of the class
   * @param instanceBuilder - A function that builds the instance side of the class
   * @retusn A class structure
   */
  static class(
    outerContext: structures.Context,
    name: string,
    staticBuilder: structures.VoidContextCallback,
    instanceBuilder: structures.VoidContextCallback,
  ): structures.Struct {
    return new structures.ClassStruct(outerContext, name, staticBuilder, instanceBuilder);
  }

  static repeat(
    context: structures.Context,
    amount: structures.Struct,
    body: structures.VoidContextCallback,
  ): structures.Flow {
    return new structures.RepeatFlow(context, amount, body);
  }
}
