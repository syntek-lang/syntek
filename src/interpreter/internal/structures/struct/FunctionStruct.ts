import Struct from './Struct';
import Context from '../context/Context';
import DefaultContext from '../context/DefaultContext';

type FunctionBody = (this: Context) => Struct;

export default class FunctionStruct implements Struct {
  readonly upperContext: Context;

  readonly paramNames: string[];

  readonly body: FunctionBody;

  constructor(upperContext: Context, paramNames: string[], body: FunctionBody) {
    this.upperContext = upperContext;
    this.paramNames = paramNames;
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
    for (let i = 0; i < this.paramNames.length; i += 1) {
      functionContext.declare(this.paramNames[i], params[i]);
    }

    return this.body.call(functionContext);
  }
}
