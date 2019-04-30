import {
  Struct, NumberStruct, ObjectStruct, ObjectBuilder, Context, FunctionParameterList,
  ContextFunction, DataType, FunctionStruct, ClassStruct,
} from '../structures';

export default class LiteralHandler {
  /**
   * Create a new number
   *
   * @param value - The numeric value
   * @returns A number structure
   */
  static number(value: number): Struct {
    return new NumberStruct(value);
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
    context: Context,
    name: string,
    parameters: FunctionParameterList,
    body: ContextFunction,
    returnType: DataType,
  ): Struct {
    return new FunctionStruct(context, name, parameters, body, returnType);
  }

  /**
   * Create a new object
   *
   * @param outerContext - The context outside of the object
   * @param objectBuilder - A function that builds the object. Called immediately
   * @returns An object structure
   */
  static object(outerContext: Context, objectBuilder: ObjectBuilder): Struct {
    return new ObjectStruct(outerContext, objectBuilder);
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
    outerContext: Context,
    name: string,
    staticBuilder: ObjectBuilder,
    instanceBuilder: ObjectBuilder,
  ): Struct {
    return new ClassStruct(outerContext, name, staticBuilder, instanceBuilder);
  }
}
