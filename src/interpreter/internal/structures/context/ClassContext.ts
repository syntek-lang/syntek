import Utils from '../Utils';
import Context from './Context';
import Struct from '../struct/Struct';
import VariableType from '../VariableType';

export default class ClassContext implements Context {
  readonly outerContext: Context;

  readonly variables: {
    [s: string]: {
      type: VariableType;
      value: Struct;
    };
  };

  readonly hasReturn: boolean = false;

  readonly hasBreak: boolean = false;

  readonly hasContinue: boolean = false;

  constructor(outerContext: Context) {
    this.outerContext = outerContext;
    this.variables = {};
  }

  get(name: string): Struct {
    return this.outerContext.get(name);
  }

  declare(name: string, type: VariableType, value: Struct): void {
    if (this.hasOwn(name)) {
      const variable = this.variables[name];

      Utils.checkValidReassign(name, variable.type, type, value);
    }

    Utils.checkValidAssign(type, value);
    this.variables[name] = { type, value };
  }

  has(name: string): boolean {
    return this.outerContext.has(name);
  }

  hasOwn(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }

  getOwn(name: string): Struct {
    return this.variables[name].value;
  }

  return(): void {
    throw new Error("You can't use return here");
  }

  break(): void {
    throw new Error("You can't use break here");
  }

  continue(): void {
    throw new Error("You can't use continue here");
  }
}
