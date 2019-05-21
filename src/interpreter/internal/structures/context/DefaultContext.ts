import Context from './Context';
import Struct from '../struct/Struct';

export default class DefaultContext implements Context {
  readonly upperContext?: Context;

  readonly variables: { [s: string]: Struct };

  constructor(upperContext?: Context) {
    this.upperContext = upperContext;
    this.variables = {};
  }

  get(name: string): Struct {
    // Get variable from self
    if (this.has(name)) {
      return this.variables[name];
    }

    // Get variable from upper context
    if (this.upperContext) {
      return this.upperContext.get(name);
    }

    throw new Error('No such variable');
  }

  declare(name: string, value: Struct): void {
    this.variables[name] = value;
  }

  has(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }
}
