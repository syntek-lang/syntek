import {
  Struct, FunctionStruct, VariableStruct, DataType, ContextFunction, ParameterList,
} from '../structures';

export default class Context {
  readonly upperContext?: Context;

  readonly scope: { [s: string]: Struct };

  constructor(upperContext?: Context) {
    this.upperContext = upperContext;
    this.scope = {};
  }

  declareFunction(
    name: string,
    parameters: ParameterList,
    body: ContextFunction,
    returnType: DataType,
  ): void {
    this.scope[name] = new FunctionStruct(name, parameters, body, returnType);
  }

  declareVariable(name: string, value: Struct): void {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      this.upperContext.declareVariable(name, value);
    } else {
      this.scope[name] = new VariableStruct(name, value);
    }
  }

  getVariable(name: string): Struct {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      return this.upperContext.getVariable(name);
    }

    return this.scope[name];
  }

  hasVariable(name: string): boolean {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      return true;
    }

    return !!this.scope[name];
  }

  dupe(): Context {
    return new Context(this);
  }
}
