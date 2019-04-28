import Struct from './Struct';
import DataType from '../DataType';
import { Context } from '../../handlers';

export default class ObjectStruct implements Struct {
  readonly type = DataType.OBJECT;

  readonly context: Context;

  constructor(context: Context, objectBuilder: (this: Context) => void) {
    this.context = context.dupe();
    objectBuilder.call(this.context);
  }

  getProperty(name: string) {
    return this.context.scope[name];
  }

  exec() {
    throw new Error('Object is not a function');
  }

  toString() {
    // return this.value.toString();
    return '';
  }

  toNumber() {
    // return this.value;
    return 0;
  }
}
