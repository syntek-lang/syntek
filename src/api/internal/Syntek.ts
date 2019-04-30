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
  readonly literalHandler: typeof LiteralHandler = LiteralHandler;

  /**
   * The math handler for doing math
   */
  readonly mathHandler: typeof MathHandler = MathHandler;

  /**
   * Create and run a program
   *
   * @param body - The body of the program containing all the code
   */
  createProgram(body: (this: Context) => void): void {
    body.call(this.context.createChild());
  }
}
