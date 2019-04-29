import Struct from './Struct';
import DataType from '../DataType';
import Context from '../context/Context';
import ObjectStruct from './ObjectStruct';
import { ObjectBuilder } from '../ParameterTypes';
import ObjectContext from '../context/ObjectContext';

export default class ClassStruct implements Struct {
  readonly type = DataType.CLASS;

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
  readonly instanceBuilder: ObjectBuilder;

  constructor(outerContext: Context, staticBuilder: ObjectBuilder, instanceBuilder: ObjectBuilder) {
    this.outerContext = outerContext;

    this.staticContext = new ObjectContext(outerContext);
    staticBuilder.call(this.staticContext);

    this.instanceBuilder = instanceBuilder;
  }

  getProperty(name: string): Struct {
    return this.staticContext.getVariable(name);
  }

  exec(): Struct {
    throw new Error('You can not use a class like a function, did you forget the new keyword?');
  }

  createNew(): ObjectStruct {
    // TODO: Call the constructor of the class
    return new ObjectStruct(this.outerContext, this.instanceBuilder);
  }

  toString(): string {
    throw new Error('You can not turn a class into a string');
  }

  toNumber(): number {
    throw new Error('You can not turn a class into a number');
  }
}
