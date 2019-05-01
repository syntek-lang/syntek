import DataType from './DataType';
import Context from './context/Context';

export type FunctionParameterList = { type: DataType; name: string }[];

export type AnyContextCallback = (this: Context) => any;
export type VoidContextCallback = (this: Context) => void;
