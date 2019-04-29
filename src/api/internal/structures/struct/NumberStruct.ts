import Struct from './Struct';
import DataType from '../DataType';

export default class NumberStruct implements Struct {
  readonly type = DataType.NUMBER;

  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getProperty(): Struct {
    throw new Error('Numbers don\'t have properties');
  }

  exec(): Struct {
    throw new Error('You can not use a number as a function');
  }

  createNew(): Struct {
    throw new Error('You can not create an instance of a number');
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return this.value;
  }
}
