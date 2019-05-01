import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';
import { VoidContextCallback } from '../ParameterTypes';
import ObjectContext from '../context/ObjectContext';

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

  constructor(
    outerContext: Context,
    name: string,
    staticBuilder: VoidContextCallback,
    instanceBuilder: VoidContextCallback,
  ) {
    this.outerContext = outerContext;
    this.name = name;

    this.staticContext = new ObjectContext(outerContext);
    staticBuilder.call(this.staticContext);

    this.instanceBuilder = instanceBuilder;
  }

  getProperty(name: string): Struct {
    return this.staticContext.getVariable(name);
  }

  setProperty(name: string, value: Struct): void {
    this.staticContext.declareVariable(name, DataType.ANY, value);
  }

  exec(): Struct {
    throw new Error('You can not use a class like a function, did you forget the new keyword?');
  }

  createNew(params: Struct[]): ObjectStruct {
    const instance = new ObjectStruct(this.outerContext, this.instanceBuilder);

    // Check for a constructor
    if (instance.context.hasVariable(this.name)) {
      const construct = instance.context.getVariable(this.name);

      if (construct.type === DataType.FUNCTION) {
        construct.exec(params);
      }
    }

    return instance;
  }

  toJson(): object {
    const json: object = {};

    const scope = this.staticContext.scope;
    for (const prop of Object.keys(scope)) {
      const jsonValue = scope[prop].toJson();

      if (jsonValue !== undefined) {
        json[prop] = jsonValue;
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
