import Struct from './Struct';
import DataType from './DataType';

export default class NumberStruct implements Struct {
  readonly type = DataType.NUMBER;

  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  call() {
    throw new Error('Number is not a function');
  }

  toString() {
    return this.value.toString();
  }

  toNumber() {
    return this.value;
  }
}
