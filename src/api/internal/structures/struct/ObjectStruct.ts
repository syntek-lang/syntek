import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import { ObjectBuilder } from '../ParameterTypes';
import ObjectContext from '../context/ObjectContext';

export default class ObjectStruct implements Struct {
  readonly type = DataType.OBJECT;

  readonly context: Context;

  constructor(outerContext: Context, objectBuilder: ObjectBuilder) {
    this.context = new ObjectContext(outerContext);
    objectBuilder.call(this.context);
  }

  getProperty(name: string): Struct {
    return this.context.scope[name];
  }

  exec(): Struct {
    throw new Error('Object is not a function');
  }

  toString(): string {
    return '';
  }

  toNumber(): number {
    return 0;
  }
}
