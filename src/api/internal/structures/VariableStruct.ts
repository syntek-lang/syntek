import Struct from './Struct';
import DataType from './DataType';
import { Context } from '../handlers';

export default class VariableStruct implements Struct {
  readonly type: DataType;

  readonly value: Struct;

  constructor(value: Struct) {
    this.type = value.type;
    this.value = value;
  }

  exec(context: Context, ...params: Struct[]) {
    return this.value.exec(context, ...params);
  }

  toString() {
    return this.value.toString();
  }

  toNumber() {
    return this.value.toNumber();
  }
}
