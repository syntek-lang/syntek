import Struct from './Struct';
import DataType from '../DataType';

export default class VariableStruct implements Struct {
  readonly type: DataType;

  readonly name: string;

  readonly value: Struct;

  constructor(name: string, type: DataType, value: Struct) {
    if (type !== DataType.ANY && type !== value.type) {
      throw new Error('Variable is assigned with the wrong type');
    }

    this.name = name;
    this.type = type;
    this.value = value;
  }

  getProperty(name: string): Struct {
    return this.value.getProperty(name);
  }

  setProperty(name: string, value: Struct): void {
    return this.value.setProperty(name, value);
  }

  exec(params: Struct[]): Struct {
    return this.value.exec(params);
  }

  createNew(params: Struct[]): Struct {
    return this.value.createNew(params);
  }

  toJson(): any {
    return this.value.toJson();
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return this.value.toNumber();
  }
}
