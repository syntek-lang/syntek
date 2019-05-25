import Utils from '../Utils';
import Context from './Context';
import Struct from '../struct/Struct';
import VariableType from '../VariableType';

export default class DefaultContext implements Context {
  readonly upperContext?: Context;

  readonly variables: {
    [s: string]: {
      type: VariableType;
      value: Struct;
    };
  };

  returnValue?: Struct;

  hasReturn: boolean;

  hasBreak: boolean;

  hasContinue: boolean;

  constructor(upperContext?: Context) {
    this.upperContext = upperContext;
    this.variables = {};
  }

  get(name: string): Struct {
    // Get variable from self
    if (this.hasOwn(name)) {
      return this.getOwn(name);
    }

    // Get variable from upper context
    if (this.upperContext) {
      return this.upperContext.get(name);
    }

    throw new Error(`There is no variable called ${name}`);
  }

  declare(name: string, type: VariableType, value: Struct): void {
    // Reassign in upper context
    if (this.upperContext && this.upperContext.has(name)) {
      this.upperContext.declare(name, type, value);
      return;
    }

    // Reassign in current context
    if (this.hasOwn(name)) {
      const variable = this.variables[name];

      Utils.checkValidReassign(name, variable.type, type, value);
    }

    // Assign variable
    Utils.checkValidAssign(type, value);
    this.variables[name] = { type, value };
  }

  has(name: string): boolean {
    if (this.upperContext && this.upperContext.has(name)) {
      return true;
    }

    return this.hasOwn(name);
  }

  hasOwn(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }

  getOwn(name: string): Struct {
    return this.variables[name].value;
  }

  return(returnValue?: Struct): void {
    this.returnValue = returnValue;
    this.hasReturn = true;
  }

  break(): void {
    this.hasBreak = true;
  }

  continue(): void {
    this.hasContinue = true;
  }
}
