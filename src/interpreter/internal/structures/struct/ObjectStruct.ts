import Struct from './Struct';
import Context from '../context/Context';

import { ObjectContext } from '..';

type ObjectBuilder = (this: Context) => void;

export default class ObjectStruct implements Struct {
  readonly context: ObjectContext;

  readonly parent?: ObjectStruct;

  child?: ObjectStruct;

  constructor(outerContext: Context, objectBuilder: ObjectBuilder, parent?: ObjectStruct) {
    // Build the object
    this.context = new ObjectContext(outerContext, this);
    objectBuilder.call(this.context);

    this.parent = parent;
  }

  get(name: string): Struct {
    if (this.context.hasOwn(name)) {
      return this.context.getOwn(name);
    }

    throw new Error(`There is no variable called ${name}`);
  }

  set(name: string, value: Struct): void {
    this.context.declare(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    let method: Struct | null = null;

    // Get method from child
    let child = this.child;
    while (child) { // Loop until we are at the very last child
      if (child.context.hasOwn(name)) {
        method = child.context.getOwn(name);
      }

      child = child.child;
    }

    // Get method from self
    if (!method) {
      method = this.context.getOwn(name);
    }

    // Get method from parent
    if (!method) {
      let parent = this.parent;
      while (!method && parent) {
        if (parent.context.hasOwn(name)) {
          method = parent.context.getOwn(name);
        }

        parent = parent.parent;
      }
    }

    // Call the method
    if (method) {
      return method.exec(params);
    }

    // Throw error if nothing was found
    throw new Error(`There is no method called ${name}`);
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on an object');
  }

  exec(): Struct {
    throw new Error('You can\'t call an object');
  }
}
