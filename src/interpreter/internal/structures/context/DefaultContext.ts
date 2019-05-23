import Context from './Context';
import Struct from '../struct/Struct';

export default class DefaultContext implements Context {
  readonly upperContext?: Context;

  readonly variables: { [s: string]: Struct };

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

  declare(name: string, value: Struct): void {
    this.variables[name] = value;
  }

  hasOwn(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }

  getOwn(name: string): Struct {
    return this.variables[name];
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
