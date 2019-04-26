import DataType from './DataType';

interface Struct {
  type: DataType;
  call(...params: Struct[]): any;
  toString(): string;
  toNumber(): number;
}

export default Struct;
