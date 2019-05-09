import Struct from './Struct';
import ObjectStruct from './ObjectStruct';

export default class ClassStruct implements Struct {
  readonly parent?: ClassStruct;

  readonly staticScope: ObjectStruct;

  readonly instanceBuilder: any;

  constructor(parent?: ClassStruct) {
    this.parent = parent;
  }

  get(name: string): Struct {
    return this.staticScope.get(name);
  }

  declare(name: string, value: Struct): void {
    this.staticScope.declare(name, value);
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
