import { Context } from './structures';
import { LiteralHandler, MathHandler } from './handlers';

export default class Syntek {
  /**
   * The literal handler for creating types
   */
  readonly literalHandler: typeof LiteralHandler = LiteralHandler;

  /**
   * The math handler for doing math
   */
  readonly mathHandler: typeof MathHandler = MathHandler;

  /**
   * The context of the Syntek instance. This holds variables declared outside of the language
   */
  readonly globalContext: Context = new Context();

  /**
   * The context of the program recently executed. This resets every time `createProgram` is
   * executed
   */
  context?: Context;

  /**
   * Create and run a program
   *
   * @param body - The body of the program containing all the code
   */
  createProgram(body: (this: Context) => void): void {
    this.context = this.globalContext.createChild();
    body.call(this.context);
  }
}
