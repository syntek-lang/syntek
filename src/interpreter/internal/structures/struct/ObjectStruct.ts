import Struct from './Struct';
import Context from '../context/Context';
import ObjectContext from '../context/ObjectContext';

type ObjectBuilder = (this: Context) => void;

export default class ObjectStruct implements Struct {
  readonly context: ObjectContext;

  readonly parent?: ObjectStruct;

  child?: ObjectStruct;

  constructor(outerContext: Context, objectBuilder: ObjectBuilder, parent?: ObjectStruct) {
    // Build the object
    const parentContext = parent ? parent.context : undefined;
    this.context = new ObjectContext(outerContext, parentContext);
    objectBuilder.call(this.context);

    this.parent = parent;
  }

  get(name: string): Struct {
    return this.context.get(name);
  }

  set(name: string, value: Struct): void {
    this.context.declare(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    let method: Struct | null = null;

    // Get method from child
    let child = this.child;
    while (child) { // Loop until we are at the very last child
      if (child.context.has(name)) {
        method = child.context.get(name);
      }

      child = child.child;
    }

    // Get method from self or parent
    if (!method) {
      method = this.context.get(name);
    }

    // Call the method
    if (method) {
      return method.exec(params);
    }

    // Throw error if nothing was found
    throw new Error(`No such method ${name}`);
  }

  createNew(): Struct {
    throw new Error('You can\'t call new on an object');
  }

  // This method can be overwritten
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(_params: Struct[]): Struct {
    throw new Error('You can\'t call an object');
  }
}
