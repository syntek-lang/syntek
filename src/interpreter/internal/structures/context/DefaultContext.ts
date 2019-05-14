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
    let variable;

    // Get variable from self
    if (this.has(name)) {
      variable = this.variables[name];
    }

    // Get variable from upper context
    if (!variable && this.upperContext) {
      variable = this.upperContext.get(name);
    }

    return variable;
  }

  declare(name: string, value: Struct): void {
    this.variables[name] = value;
  }

  has(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.variables, name);
  }
}
