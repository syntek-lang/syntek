import Struct from './Struct';
import DataType from './DataType';
import ContextFunction from './ContextFunction';
import { Context } from '../handlers';

export default class FunctionStruct implements Struct {
  readonly type = DataType.FUNCTION;

  readonly parameters: DataType[];

  readonly body: ContextFunction;

  readonly returnType?: DataType;

  constructor(
    parameters: DataType[],
    body: ContextFunction,
    returnType?: DataType,
  ) {
    this.parameters = parameters;
    this.body = body;
    this.returnType = returnType;
  }

  exec(context: Context, ...params: Struct[]) {
    if (params.length !== this.parameters.length) {
      throw new Error(`Expected ${this.parameters.length} parameters, received ${params.length}`);
    }

    for (let i = 0; i < params.length; i += 1) {
      if (params[i].type !== this.parameters[i] && this.parameters[i] !== DataType.ANY) {
        throw new Error('Function expected different parameter type');
      }
    }

    return this.body.call(context.dupe(), ...params);
  }

  toString() {
    return '';
  }

  toNumber() {
    return 0;
  }
}
