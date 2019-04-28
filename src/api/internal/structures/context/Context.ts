import DataType from '../DataType';
import Struct from '../struct/Struct';
import VariableStruct from '../struct/VariableStruct';
import Utils from '../../utils';

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
      return;
    }

    if (this.scope[name]) {
      // Reassigning variable in the current scope
      const variable = this.scope[name];
      Utils.checkValidReassign(name, type, variable);

      this.scope[name] = new VariableStruct(name, variable.type, value);
      return;
    }

    // Variable has not been declared yet
    this.scope[name] = new VariableStruct(name, type, value);
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
