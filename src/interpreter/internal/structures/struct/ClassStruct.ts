import Struct from './Struct';
import Context from '../context/Context';
import VariableType from '../VariableType';

import { ObjectStruct, ObjectContext, FunctionStruct } from '..';

type ObjectBuilder = (this: Context) => void;

export default class ClassStruct implements Struct {
  readonly outerContext: Context;

  readonly name: string;

  readonly parent?: ClassStruct;

  readonly staticContext: ObjectContext;

  readonly instanceBuilder: ObjectBuilder;

  constructor(
    outerContext: Context,
    name: string,
    staticBuilder: ObjectBuilder,
    instanceBuilder: ObjectBuilder,
    parent?: ClassStruct,
  ) {
    this.outerContext = outerContext;
    this.name = name;
    this.instanceBuilder = instanceBuilder;
    this.parent = parent;

    // Build the static context
    this.staticContext = new ObjectContext(outerContext);
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

  set(name: string, type: VariableType, value: Struct): void {
    this.staticContext.declare(name, type, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    return this.get(name).exec(params);
  }

  createNew(params: Struct[]): Struct {
    const instanceObject = this.createInstanceObject();

    if (instanceObject.context.hasOwn(this.name)) {
      const constructor = instanceObject.context.getOwn(this.name);

      if (constructor instanceof FunctionStruct) {
        constructor.exec(params);
      }
    }

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
