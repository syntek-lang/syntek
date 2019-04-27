import {
  Struct, FunctionStruct, VariableStruct, DataType, ContextFunction,
} from '../structures';

export default class Context {
  readonly variables: { [s: string]: Struct } = {};

  declareFunction(
    name: string,
    parameters: DataType[],
    body: ContextFunction,
    returnType?: DataType,
  ) {
    this.variables[name] = new FunctionStruct(parameters, body, returnType);
  }

  executeFunction(name: string, parameters: Struct[]) {
    this.variables[name].exec(this, ...parameters);
  }

  declareVariable(name: string, value: Struct) {
    this.variables[name] = new VariableStruct(value);
  }

  getVariable(name: string) {
    return this.variables[name];
  }
}
