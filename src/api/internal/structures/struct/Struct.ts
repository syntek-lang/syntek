import DataType from '../DataType';
import { Context } from '../../handlers';

interface Struct {
  type: DataType;
  exec(context: Context, ...params: Struct[]): any;
  toString(): string;
  toNumber(): number;
}

export default Struct;
