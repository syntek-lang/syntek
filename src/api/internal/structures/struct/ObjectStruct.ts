import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import { ObjectBuilder } from '../ParameterTypes';
import ObjectContext from '../context/ObjectContext';

export default class ObjectStruct implements Struct {
  readonly type = DataType.OBJECT;

  readonly context: ObjectContext;

  constructor(outerContext: Context, objectBuilder: ObjectBuilder) {
    this.context = new ObjectContext(outerContext);
    objectBuilder.call(this.context);
  }

  getProperty(name: string): Struct {
    return this.context.scope[name];
  }

  exec(): Struct {
    throw new Error('You can not use an object as a function');
  }

  createNew(): Struct {
    throw new Error('You can not use new on an object');
  }

  toString(): string {
    // TODO: Produce JSON from the context
    return 'JSON';
  }

  toNumber(): number {
    throw new Error('You can not turn an object into a number');
  }
}
