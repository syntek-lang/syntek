import Struct from './Struct';
import { Context } from '../handlers';

type ContextFunction = (this: Context, ...params: Struct[]) => any;
export default ContextFunction;
