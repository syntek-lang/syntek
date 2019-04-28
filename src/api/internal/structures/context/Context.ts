import DataType from '../DataType';
import Struct from '../struct/Struct';
import VariableStruct from '../struct/VariableStruct';

export default class Context {
  readonly upperContext?: Context;

  readonly scope: { [s: string]: Struct };

  constructor(upperContext?: Context) {
    this.upperContext = upperContext;
    this.scope = {};
  }

  declareVariable(name: string, type: DataType, value: Struct): void {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      this.upperContext.declareVariable(name, type, value);
    } else {
      this.scope[name] = new VariableStruct(name, type, value);
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

  createChild(): Context {
    return new Context(this);
  }
}
