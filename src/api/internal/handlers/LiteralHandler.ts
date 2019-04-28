import {
  Struct, NumberStruct, ObjectStruct, ObjectBuilder, Context, FunctionParameterList,
  ContextFunction, DataType, FunctionStruct,
} from '../structures';

export default class LiteralHandler {
  number(value: number): Struct {
    return new NumberStruct(value);
  }

  function(
    context: Context,
    name: string,
    parameters: FunctionParameterList,
    body: ContextFunction,
    returnType: DataType,
  ): Struct {
    return new FunctionStruct(context, name, parameters, body, returnType);
  }

  object(outerContext: Context, objectBuilder: ObjectBuilder): Struct {
    return new ObjectStruct(outerContext, objectBuilder);
  }
}
