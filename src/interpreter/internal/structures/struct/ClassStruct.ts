import Struct from './Struct';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';

type ObjectBuilder = (this: Context) => void;

export default class ClassStruct extends ObjectStruct {
  readonly outerContext: Context;

  readonly parent?: ClassStruct;

  readonly instanceBuilder: ObjectBuilder;

  constructor(
    outerContext: Context,
    staticBuilder: ObjectBuilder,
    instanceBuilder: ObjectBuilder,
    parent?: ClassStruct,
  ) {
    super(outerContext, staticBuilder, parent);

    this.outerContext = outerContext;
    this.instanceBuilder = instanceBuilder;
    this.parent = parent;
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
