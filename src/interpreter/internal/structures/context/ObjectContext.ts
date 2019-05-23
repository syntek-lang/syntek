import Context from './Context';
import Struct from '../struct/Struct';

export default class ObjectContext implements Context {
  readonly outerContext: Context;

  readonly thisValue: Struct;

  readonly variables: { [s: string]: Struct };

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
}
