import DataType from './DataType';
import Context from './context/Context';

export type FunctionParameterList = { type: DataType, name: string }[];
export type ContextFunction = (this: Context) => any;
export type ObjectBuilder = (this: Context) => void;
