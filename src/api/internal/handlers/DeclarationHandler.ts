import Struct from '../structures/Struct';
import FunctionStruct from '../structures/FunctionStruct';
import VariableStruct from '../structures/VariableStruct';
import DataType from '../structures/DataType';

export default class DeclarationHandler {
  readonly variables: { [s: string]: Struct } = {};

  declareFunction(
    name: string,
    parameters: DataType[],
    body: (...any: any) => any,
    returnType?: DataType,
  ) {
    this.variables[name] = new FunctionStruct(parameters, body, returnType);
  }

  declareVariable(name: string, value: Struct) {
    this.variables[name] = new VariableStruct(value);
  }

  executeFunction(name: string, parameters: Struct[]) {
    this.variables[name].call(...parameters);
  }

  getVariable(name: string) {
    return this.variables[name];
  }
}
