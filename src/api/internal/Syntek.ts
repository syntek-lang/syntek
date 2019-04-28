import { Context } from './structures';
import { LiteralHandler, MathHandler } from './handlers';

export default class Syntek {
  /**
   * The context of the Syntek instance. This holds variables declared outside of the language
   */
  readonly context: Context = new Context();

  /**
   * The literal handler for creating types
   */
  readonly literalHandler: LiteralHandler = new LiteralHandler();

  /**
   * The math handler for doing math
   */
  readonly mathHandler: MathHandler = new MathHandler();

  /**
   * Create and run a program
   *
   * @param body - The body of the program containing all the code
   */
  createProgram(body: (this: Context) => void) {
    body.call(this.context.createChild());
  }
}
