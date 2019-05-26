import Context from './structures/context/Context';

import { DefaultContext, ModuleStruct } from './structures';

type Body = (this: Context) => void;

export default class Interpreter {
  readonly modules: { [s: string]: ModuleStruct };

  readonly globalContext: DefaultContext;

  context?: DefaultContext;

  constructor() {
    this.modules = {};
    this.globalContext = new DefaultContext();
  }

  run(body: Body): void {
    this.context = new DefaultContext(this.globalContext);

    body.call(this.context);
  }

  declareModule(name: string, struct: ModuleStruct): void {
    if (Object.prototype.hasOwnProperty.call(this.modules, name)) {
      throw new Error(`A module with the name ${name} already exists`);
    }

    this.modules[name] = struct;
  }

  getModule(name: string): ModuleStruct {
    if (!Object.prototype.hasOwnProperty.call(this.modules, name)) {
      throw new Error(`There is no module with the name ${name}`);
    }

    return this.modules[name];
  }
}
