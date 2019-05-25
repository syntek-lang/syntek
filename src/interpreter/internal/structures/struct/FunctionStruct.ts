import Struct from './Struct';
import Context from '../context/Context';

import { NullLiteral, DefaultContext } from '..';
import VariableType from '../VariableType';

type FunctionBody = (this: Context) => void;
type ParameterList = { type: VariableType; name: string }[];

export default class FunctionStruct implements Struct {
  readonly upperContext: Context;

  readonly params: ParameterList;

  readonly body: FunctionBody;

  constructor(upperContext: Context, params: ParameterList, body: FunctionBody) {
    this.upperContext = upperContext;
    this.params = params;
    this.body = body;
  }

  get(): Struct {
    throw new Error('Functions don\'t have properties');
  }

  set(): void {
    throw new Error('You can\'t set a property on a function');
  }

  callMethod(): Struct {
    throw new Error('Functions don\'t have methods');
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on a function');
  }

  exec(params: Struct[]): Struct {
    const functionContext = new DefaultContext(this.upperContext);

    // Assign parameters to the context
    for (let i = 0; i < this.params.length; i += 1) {
      functionContext.declare(this.params[i].name, this.params[i].type, params[i]);
    }

    // Execute the function
    this.body.call(functionContext);

    return functionContext.returnValue || new NullLiteral();
  }
}
