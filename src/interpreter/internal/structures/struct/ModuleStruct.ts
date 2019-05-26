import Struct from './Struct';
import VariableType from '../VariableType';

import { DefaultContext } from '..';

type ModuleBuilder = (this: DefaultContext) => void;

export default class ModuleStruct implements Struct {
  readonly context: DefaultContext;

  constructor(globalContext: DefaultContext, moduleBuilder: ModuleBuilder) {
    this.context = new DefaultContext(globalContext);
    moduleBuilder.call(this.context);
  }

  get(name: string): Struct {
    if (this.context.hasOwn(name)) {
      return this.context.getOwn(name);
    }

    throw new Error(`There is no variable called ${name}`);
  }

  set(name: string, type: VariableType, value: Struct): void {
    this.context.declare(name, type, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    return this.get(name).exec(params);
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on a module');
  }

  exec(): Struct {
    throw new Error('You can\'t call a module');
  }
}
