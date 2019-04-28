import Struct from './Struct';
import DataType from '../DataType';
import { Context } from '../../handlers';

export default class VariableStruct implements Struct {
  readonly type: DataType;

  readonly name: string;

  readonly value: Struct;

  constructor(name: string, value: Struct) {
    this.type = value.type;

    this.name = name;
    this.value = value;
  }

  getProperty(name: string) {
    return this.value.getProperty(name);
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
