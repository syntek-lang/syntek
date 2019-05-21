import Struct from './Struct';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';

type ObjectBuilder = (this: Context) => void;

export default class ClassStruct implements Struct {
  readonly outerContext: Context;

  readonly parent?: ClassStruct;

  readonly staticObject: ObjectStruct;

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

    // Build the static object
    const parentStaticObject = parent ? parent.staticObject : undefined;
    this.staticObject = new ObjectStruct(outerContext, staticBuilder, parentStaticObject);
  }

  get(name: string): Struct {
    return this.staticObject.get(name);
  }

  set(name: string, value: Struct): void {
    this.staticObject.set(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    return this.staticObject.callMethod(name, params);
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
