import Struct from './Struct';
import Context from '../context/Context';
import ObjectContext from '../context/ObjectContext';

type ObjectBuilder = (this: Context) => void;

export default class ClassStruct implements Struct {
  readonly outerContext: Context;

  readonly parent?: ClassStruct;

  readonly staticContext: ObjectContext;

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
    const parentContext = parent ? parent.staticContext : undefined;
    this.staticContext = new ObjectContext(outerContext, parentContext);
    staticBuilder.call(this.staticContext);
  }

  get(name: string): Struct {
    return this.staticContext.get(name);
  }

  set(name: string, value: Struct): void {
    this.staticContext.declare(name, value);
  }

  callMethod(name: string, params: Struct[]): Struct {
    // TODO: Implement logic
    console.log(name, params);
    return this;
  }

  createNew(params: Struct[]): Struct {
    // TODO: Create instance
    console.log(params);
    return this;
  }
}
