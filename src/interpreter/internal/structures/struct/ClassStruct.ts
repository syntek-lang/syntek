import Struct from './Struct';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';
import ClassContext from '../context/ClassContext';

type ObjectBuilder = (this: Context) => void;

export default class ClassStruct implements Struct {
  readonly outerContext: Context;

  readonly parent?: ClassStruct;

  readonly staticContext: ClassContext;

  readonly instanceBuilder: ObjectBuilder;

  constructor(
    outerContext: Context,
    staticBuilder: ObjectBuilder,
    instanceBuilder: ObjectBuilder,
    parent?: ClassStruct,
  ) {
    this.outerContext = outerContext;
    this.instanceBuilder = instanceBuilder;
    this.parent = parent;

    // Build the static context
    this.staticContext = new ClassContext(outerContext);
    staticBuilder.call(this.staticContext);
  }

  get(name: string): Struct {
    // Get from self
    if (this.staticContext.hasOwn(name)) {
      return this.staticContext.getOwn(name);
    }

    // Get from parent
    if (this.parent) {
      return this.parent.get(name);
    }

    throw new Error(`No variable with the name ${name}`);
  }

  set(name: string, value: Struct): void {
    this.staticContext.declare(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    return this.get(name).exec(params);
  }

  createNew(): Struct {
    const instanceObject = this.createInstanceObject();

    // TODO: Call constructor with params
    return instanceObject;
  }

  createInstanceObject(): ObjectStruct {
    const parentInstanceObject = this.parent ? this.parent.createInstanceObject() : undefined;

    const instance = new ObjectStruct(
      this.outerContext,
      this.instanceBuilder,
      parentInstanceObject,
    );

    if (parentInstanceObject) {
      parentInstanceObject.child = instance;
    }

    return instance;
  }

  exec(): Struct {
    throw new Error('You can\'t call a class');
  }
}
