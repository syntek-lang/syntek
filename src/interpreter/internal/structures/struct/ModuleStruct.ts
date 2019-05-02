import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import { VoidContextCallback } from '../ParameterTypes';

export default class ModuleStruct implements Struct {
  readonly type = DataType.MODULE;

  readonly name: string;

  readonly context: Context;

  constructor(name: string, moduleBuilder: VoidContextCallback) {
    this.name = name;

    this.context = new Context();
    moduleBuilder.call(this.context);
  }

  getProperty(name: string): Struct {
    if (!this.context.scope[name]) {
      throw new Error(`Module ${this.name} does not have a property ${name}`);
    }

    return this.context.scope[name];
  }

  setProperty(name: string, value: Struct): void {
    this.context.declareVariable(name, DataType.ANY, value);
  }

  exec(): Struct {
    throw new Error('You can not use a module as a function');
  }

  createNew(): Struct {
    throw new Error('You can not use new on a module');
  }

  toJson(): object {
    const json: object = {};

    const scope = this.context.scope;
    for (const prop of Object.keys(scope)) {
      const jsonValue = scope[prop].toJson();

      if (jsonValue !== undefined) {
        json[prop] = jsonValue;
      }
    }

    return json;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }

  toNumber(): number {
    throw new Error('You can not turn a module into a number');
  }
}
