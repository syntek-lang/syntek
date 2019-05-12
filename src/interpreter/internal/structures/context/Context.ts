import Struct from '../struct/Struct';

interface Context {
  get(name: string): Struct;

  declare(name: string, value: Struct): void;

  has(name: string): boolean;
}

export default Context;
