import DataType from '../DataType';

interface Struct {
  type: DataType;
  getProperty(name: string): Struct;
  exec(params: Struct[]): any;
  toString(): string;
  toNumber(): number;
}

export default Struct;
