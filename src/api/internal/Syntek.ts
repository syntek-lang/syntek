import { Context, LiteralHandler, MathHandler } from './handlers';

export default class Syntek {
  readonly context: Context = new Context();

  readonly literalHandler: LiteralHandler = new LiteralHandler();

  readonly mathHandler: MathHandler = new MathHandler();

  createProgram(body: (this: Context) => void) {
    body.call(this.context);
  }
}
