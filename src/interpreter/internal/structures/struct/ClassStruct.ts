import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';
import VariableStruct from './VariableStruct';
import ObjectContext from '../context/ObjectContext';
import { VoidContextCallback } from '../ParameterTypes';

export default class ClassStruct implements Struct {
  readonly type = DataType.CLASS;

  /**
   * The name of the class
   */
  readonly name: string;

  /**
   * The context outside of the class
   */
  readonly outerContext: Context;

  /**
   * The static context of the class, containing all static variables and functions
   */
  readonly staticContext: ObjectContext;

  /**
   * The instance builder to create an instance of this class
   */
  readonly instanceBuilder: VoidContextCallback;

  /**
   * The parent of this class
   */
  readonly parentClass?: ClassStruct;

  constructor(
    outerContext: Context,
    name: string,
    staticBuilder: VoidContextCallback,
    instanceBuilder: VoidContextCallback,
    parent?: Struct,
  ) {
    this.outerContext = outerContext;
    this.name = name;
    this.instanceBuilder = instanceBuilder;

    // Get the parent class from the parent parameter
    const parentClass = parent instanceof VariableStruct ? parent.value : parent;

    if (parentClass && !(parentClass instanceof ClassStruct)) {
      throw new Error('Class can only extend a class');
    }

    this.parentClass = parentClass;

    // Build the static context
    const parentStaticContext = parentClass ? parentClass.staticContext : undefined;
    this.staticContext = new ObjectContext(outerContext, parentStaticContext);
    staticBuilder.call(this.staticContext);
  }

  getProperty(name: string): Struct {
    if (!this.staticContext.hasVariable(name)) {
      throw new Error(`Class does not have property ${name}`);
    }

    return this.staticContext.getVariable(name);
  }

  setProperty(name: string, value: Struct): void {
    this.staticContext.declareVariable(name, DataType.ANY, value);
  }

  exec(): Struct {
    throw new Error('You can not use a class like a function, did you forget the new keyword?');
  }

  createNew(params: Struct[], callConstructor: boolean = true): ObjectStruct {
    // Create an instance of the parent class if any
    const parentInstance = this.parentClass
      ? this.parentClass.createNew([], false).context
      : undefined;

    const instance = new ObjectStruct(this.outerContext, this.instanceBuilder, parentInstance);

    // If the constructor should be called, check for a constructor and execute it
    // Constructor should not be called when it's a parent class
    if (callConstructor && instance.context.hasVariable(this.name)) {
      const construct = instance.context.getVariable(this.name);

      if (construct.type === DataType.FUNCTION) {
        construct.exec(params);
      }
    }

    return instance;
  }

  toJson(): object {
    const json: object = {};

    for (const [name, value] of this.staticContext.getVariables()) {
      const jsonValue = value.toJson();

      if (jsonValue !== undefined) {
        json[name] = jsonValue;
      }
    }

    return json;
  }

  toString(): string {
    throw new Error('You can not turn a class into a string');
  }

  toNumber(): number {
    throw new Error('You can not turn a class into a number');
  }
}
