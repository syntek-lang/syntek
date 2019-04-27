import { Context } from '../handlers';

type ContextFunction = (this: Context) => any;
export default ContextFunction;
