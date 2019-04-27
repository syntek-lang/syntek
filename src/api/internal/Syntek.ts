import { Context, LiteralHandler, MathHandler } from './handlers';

export default class Syntek {
  readonly context = new Context();

  readonly literalHandler = new LiteralHandler();

  readonly mathHandler = new MathHandler();

  createProgram(body: (this: Context) => void) {
    body.call(this.context);
  }
}
