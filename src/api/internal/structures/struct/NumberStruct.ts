import Struct from './Struct';
import DataType from '../DataType';

export default class NumberStruct implements Struct {
  readonly type = DataType.NUMBER;

  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getProperty(): Struct {
    return this;
  }

  exec(): Struct {
    throw new Error('Number is not a function');
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return this.value;
  }
}
