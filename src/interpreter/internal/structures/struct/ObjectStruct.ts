import Struct from './Struct';
import Context from '../Context';

export default class ObjectStruct implements Struct {
  readonly context: Context;

  readonly parent?: ObjectStruct;

  child?: ObjectStruct;

  constructor(parent?: ObjectStruct) {
    this.parent = parent;

    this.context = new Context();
  }

  get(name: string): Struct {
    let variable: Struct | null = null;

    // Get from child
    let child = this.child;

    while (!variable && child) {
      console.log(child);

      if (child.context.has(name)) {
        variable = child.context.get(name);
      }

      child = child.child;
    }

    // Get from current scope
    if (!variable && this.context.has(name)) {
      variable = this.context.get(name);
    }

    // Get from parent
    let parent = this.parent;
    while (!variable && parent) {
      console.log(parent);

      if (parent.context.has(name)) {
        variable = parent.context.get(name);
      }

      parent = parent.parent;
    }

    // Return variable
    if (variable) {
      return variable;
    }

    throw new Error(`No such property ${name}`);
  }

  declare(name: string, value: Struct): void {
    this.context.set(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    // TODO: Implement logic
    console.log(name, params);
    return this;
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on an object');
  }
}
