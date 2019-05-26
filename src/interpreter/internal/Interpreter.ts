import * as s from './structures';
import Context from './structures/context/Context';

type Body = (this: Context, i: Interpreter, s) => void;

export default class Interpreter {
  readonly modules: { [s: string]: s.ModuleStruct };

  readonly globalContext: s.DefaultContext;

  context?: s.DefaultContext;

  constructor() {
    this.modules = {};
    this.globalContext = new s.DefaultContext();
  }

  run(body: Body): void {
    this.context = new s.DefaultContext(this.globalContext);

    body.call(this.context, this, s);
  }

  declareModule(name: string, struct: s.ModuleStruct): void {
    if (Object.prototype.hasOwnProperty.call(this.modules, name)) {
      throw new Error(`A module with the name ${name} already exists`);
    }

    this.modules[name] = struct;
  }

  getModule(name: string): s.ModuleStruct {
    if (!Object.prototype.hasOwnProperty.call(this.modules, name)) {
      throw new Error(`There is no module with the name ${name}`);
    }

    return this.modules[name];
  }
}
