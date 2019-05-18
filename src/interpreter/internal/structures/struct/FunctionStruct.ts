import Struct from './Struct';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';
import DefaultContext from '../context/DefaultContext';

type FunctionBody = (this: Context) => Struct;

export default class FunctionStruct extends ObjectStruct {
  readonly functionContext: Context;

  readonly paramNames: string[];

  readonly body: FunctionBody;

  constructor(functionContext: Context, paramNames: string[], body: FunctionBody) {
    super(new DefaultContext(), () => {});

    this.functionContext = functionContext;
    this.paramNames = paramNames;
    this.body = body;
  }

  exec(params: Struct[]): Struct {
    const functionContext = new DefaultContext(this.functionContext);

    // Assign parameters to the context
    for (let i = 0; i < this.paramNames.length; i += 1) {
      functionContext.declare(this.paramNames[i], params[i]);
    }

    return this.body.call(functionContext);
  }
}
