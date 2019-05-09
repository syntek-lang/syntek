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
    return this.context.get(name);
  }

  declare(name: string, value: Struct): void {
    this.context.set(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    // TODO: Use params to call the method
    console.log(params);

    let variable: Struct | null = null;

    // Get from child
    let child = this.child;
    while (child) { // Loop until we are at the very last child
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
    while (!variable && parent) { // Get from the closest parent
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

    // Throw error if nothing was found
    throw new Error(`No such method ${name}`);
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on an object');
  }
}
