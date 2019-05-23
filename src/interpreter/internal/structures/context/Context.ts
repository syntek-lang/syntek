import Struct from '../struct/Struct';

interface Context {
  /**
   * Get a variable from the context
   *
   * @param name - The name of the variable
   * @returns The variable
   */
  get(name: string): Struct;

  /**
   * Declare a variable on the context
   *
   * @param name - The name of the variable
   * @param value - The value of the variable
   */
  declare(name: string, value: Struct): void;

  /**
   * Check if a variable with the given name exists on the current context
   *
   * @param name - The name of the variable
   * @returns Whether the variable exists
   */
  hasOwn(name: string): boolean;

  /**
   * Get a variable from the current context object.
   *
   * @param name - The name of the variable
   * @returns The variable
   */
  getOwn(name: string): Struct;
}

export default Context;
