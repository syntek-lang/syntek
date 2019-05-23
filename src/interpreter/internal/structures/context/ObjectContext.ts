import Context from './Context';
import Struct from '../struct/Struct';

export default class ObjectContext implements Context {
  readonly outerContext: Context;

  readonly thisValue: Struct;

  readonly variables: { [s: string]: Struct };

  readonly hasReturn: boolean = false;

  readonly hasBreak: boolean = false;

  readonly hasContinue: boolean = false;

  constructor(outerContext: Context, thisValue: Struct) {
    this.outerContext = outerContext;
    this.thisValue = thisValue;

    this.variables = {};
  }

  get(name: string): Struct {
    if (name === 'this') {
      return this.thisValue;
    }

    return this.outerContext.get(name);
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
