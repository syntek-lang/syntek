import { Context, VoidContextCallback, ModuleStruct } from './structures';
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
   * Modules that can be imported
   */
  readonly modules: { [s: string]: ModuleStruct } = {};

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
  createProgram(body: VoidContextCallback): void {
    this.context = this.globalContext.createChild();
    body.call(this.context);
  }

  /**
   * Declare a module
   *
   * @param name - The name of the module
   * @param moduleBuilder - A function that builds the module
   */
  declareModule(name: string, moduleBuilder: VoidContextCallback): void {
    if (this.modules[name]) {
      throw new Error(`A module with the name ${name} already exists`);
    }

    this.modules[name] = new ModuleStruct(name, moduleBuilder);
  }

  /**
   * Load a module
   *
   * @param name - The name of the module
   */
  getModule(name: string): ModuleStruct {
    if (!this.modules[name]) {
      throw new Error(`There is no module called ${name}`);
    }

    return this.modules[name];
  }
}
