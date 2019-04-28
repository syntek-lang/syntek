import Struct from './Struct';
import DataType from '../DataType';
import ParameterList from '../ParameterList';
import ContextFunction from '../ContextFunction';
import { Context } from '../../handlers';

export default class FunctionStruct implements Struct {
  readonly type = DataType.FUNCTION;

  readonly name: string;

  readonly parameters: ParameterList;

  readonly body: ContextFunction;

  readonly returnType: DataType;

  constructor(
    name: string,
    parameters: ParameterList,
    body: ContextFunction,
    returnType: DataType,
  ) {
    this.name = name;
    this.parameters = parameters;
    this.body = body;
    this.returnType = returnType;
  }

  getProperty() {
    return this;
  }

  exec(context: Context, params: Struct[]) {
    if (params.length !== this.parameters.length) {
      throw new Error(`Expected ${this.parameters.length} parameters, received ${params.length}`);
    }

    for (let i = 0; i < params.length; i += 1) {
      const expectedType = this.parameters[i].type;

      if (expectedType !== DataType.ANY && params[i].type !== expectedType) {
        throw new Error('Function expected different parameter type');
      }
    }

    const functionContext = context.dupe();
    for (let i = 0; i < params.length; i += 1) {
      const name = this.parameters[i].name;

      if (functionContext.hasVariable(name)) {
        throw new Error('Function parameter is already declared in upper scope');
      }

      functionContext.declareVariable(name, params[i]);
    }

    const returnValue: Struct = this.body.call(functionContext);

    if (
      this.returnType !== DataType.ANY
        && (!returnValue || returnValue.type !== this.returnType)
    ) {
      throw new Error('Function returned the wrong type');
    }

    return returnValue;
  }

  toString() {
    return '';
  }

  toNumber() {
    return 0;
  }
}
