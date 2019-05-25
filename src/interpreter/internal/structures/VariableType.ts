import Struct from './struct/Struct';

type VariableType = (new (...any) => Struct) | null;
export default VariableType;
