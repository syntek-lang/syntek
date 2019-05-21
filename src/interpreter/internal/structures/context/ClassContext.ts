import Context from './Context';
import Struct from '../struct/Struct';

export default class ClassContext implements Context {
  readonly outerContext: Context;

  readonly variables: { [s: string]: Struct };

  constructor(outerContext: Context) {
    this.outerContext = outerContext;
    this.variables = {};
  }

  get(name: string): Struct {
    return this.outerContext.get(name);
  }

  declare(name: string, value: Struct): void {
    this.variables[name] = value;
  }

  has(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }
}
