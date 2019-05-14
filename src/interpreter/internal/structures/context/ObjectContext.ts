import Context from './Context';
import Struct from '../struct/Struct';

export default class ObjectContext implements Context {
  readonly outerContext: Context;

  readonly parentObjectContext?: ObjectContext;

  readonly variables: { [s: string]: Struct };

  constructor(outerContext: Context, parentObjectContext?: ObjectContext) {
    this.outerContext = outerContext;
    this.parentObjectContext = parentObjectContext;

    this.variables = {};
  }

  get(name: string): Struct {
    let variable;

    // Get variable from self
    if (this.has(name)) {
      variable = this.variables[name];
    }

    // Get variable from parent
    if (!variable && this.parentObjectContext) {
      variable = this.parentObjectContext.get(name);
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
