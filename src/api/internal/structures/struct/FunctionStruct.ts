import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import { FunctionParameterList, ContextFunction } from '../ParameterTypes';

export default class FunctionStruct implements Struct {
  readonly type = DataType.FUNCTION;

  readonly context: Context;

  readonly name: string;

  readonly parameters: FunctionParameterList;

  readonly body: ContextFunction;

  readonly returnType: DataType;

  constructor(
    context: Context,
    name: string,
    parameters: FunctionParameterList,
    body: ContextFunction,
    returnType: DataType,
  ) {
    this.context = context;
    this.name = name;
    this.parameters = parameters;
    this.body = body;
    this.returnType = returnType;
  }

  getProperty(): Struct {
    throw new Error('Functions don\'t have properties');
  }

  setProperty(): void {
    throw new Error('Functions don\'t have properties');
  }

  exec(params: Struct[]): Struct {
    if (params.length !== this.parameters.length) {
      throw new Error(`Expected ${this.parameters.length} parameters, received ${params.length}`);
    }

    for (let i = 0; i < params.length; i += 1) {
      const expectedType = this.parameters[i].type;

      if (expectedType !== DataType.ANY && params[i].type !== expectedType) {
        throw new Error('Function expected different parameter type');
      }
    }

    const functionContext = this.context.createChild();
    for (let i = 0; i < params.length; i += 1) {
      const name = this.parameters[i].name;

      if (functionContext.hasVariable(name)) {
        throw new Error('Function parameter is already declared in upper scope');
      }

      functionContext.declareVariable(name, params[i].type, params[i]);
    }

    const returnValue: Struct = this.body.call(functionContext);

    // Check if the function is supposed to return something but it did not, or
    // if it returned the wrong type
    if (
      this.returnType !== DataType.ANY
        && (!returnValue || returnValue.type !== this.returnType)
    ) {
      throw new Error('Function returned the wrong type');
    }

    return returnValue;
  }

  createNew(): Struct {
    throw new Error('You can not create an instance of a function');
  }

  toString(): string {
    throw new Error('You can not turn a function into a string');
  }

  toNumber(): number {
    throw new Error('You can not turn a function into a number');
  }
}
