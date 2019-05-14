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
    // TODO: Implement logic
    console.log(name, params);
    return this;
  }

  createNew(params: Struct[]): Struct {
    // TODO: Create instance, call constructor
    console.log(params);

    // const instance
    return this;
  }
}
