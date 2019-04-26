import Struct from './Struct';
import DataType from './DataType';

export default class FunctionStruct implements Struct {
  readonly type = DataType.FUNCTION;

  readonly parameters: DataType[];

  readonly body: (...params: Struct[]) => any;

  readonly returnType?: DataType;

  constructor(parameters: DataType[], body: (...params: Struct[]) => any, returnType?: DataType) {
    this.parameters = parameters;
    this.body = body;
    this.returnType = returnType;
  }

  call(...params: Struct[]) {
    if (params.length !== this.parameters.length) {
      throw new Error(`Expected ${this.parameters.length} parameters, received ${params.length}`);
    }

    for (let i = 0; i < params.length; i += 1) {
      if (params[i].type !== this.parameters[i] && this.parameters[i] !== DataType.ANY) {
        throw new Error('Function expected different parameter type');
      }
    }

    return this.body(...params);
  }

  toString() {
    return '';
  }

  toNumber() {
    return 0;
  }
}
