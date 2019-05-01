import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import { VoidContextCallback } from '../ParameterTypes';
import ObjectContext from '../context/ObjectContext';

export default class ObjectStruct implements Struct {
  readonly type = DataType.OBJECT;

  readonly context: ObjectContext;

  constructor(outerContext: Context, objectBuilder: VoidContextCallback) {
    this.context = new ObjectContext(outerContext);
    objectBuilder.call(this.context);
  }

  getProperty(name: string): Struct {
    return this.context.scope[name];
  }

  setProperty(name: string, value: Struct): void {
    this.context.declareVariable(name, DataType.ANY, value);
  }

  exec(): Struct {
    throw new Error('You can not use an object as a function');
  }

  createNew(): Struct {
    throw new Error('You can not use new on an object');
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
    throw new Error('You can not turn an object into a number');
  }
}
