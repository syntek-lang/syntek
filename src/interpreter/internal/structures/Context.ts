import Struct from './struct/Struct';

export default class Context {
  readonly variables: { [s: string]: Struct } = {};

  get(name: string): Struct {
    return this.variables[name];
  }

  set(name: string, value: Struct): void {
    this.variables[name] = value;
  }

  has(name: string): boolean {
    return !!this.variables.hasOwnProperty(name);
  }
}
