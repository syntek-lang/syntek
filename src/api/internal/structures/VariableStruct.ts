import Struct from './Struct';
import DataType from './DataType';

export default class VariableStruct implements Struct {
  readonly type: DataType;

  readonly value: Struct;

  constructor(value: Struct) {
    this.type = value.type;
    this.value = value;
  }

  call() {
    return this.value.call();
  }

  toString() {
    return this.value.toString();
  }

  toNumber() {
    return this.value.toNumber();
  }
}
