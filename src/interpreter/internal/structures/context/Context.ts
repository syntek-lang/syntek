import DataType from '../DataType';
import Struct from '../struct/Struct';

interface Context {
  /**
   * Get all variables declared in this context
   *
   * @returns An array of arrays in the format `[name, value]`
   */
  getVariables(): [string, Struct][];

  /**
   * Declare a variable
   *
   * @param name - The name of the variable
   * @param type - The type of the variable
   * @param value - The value of the variable
   */
  declareVariable(name: string, type: DataType, value: Struct): void;

  /**
   * Get a variable
   *
   * @param name - The name of the variable
   * @returns The variable
   */
  getVariable(name: string): Struct;

  /**
   * Check if a variable with the given name exists
   *
   * @param name - The name of the variable
   * @returns Whether there is a variable with the given name
   */
  hasVariable(name: string): boolean;

  /**
   * Create a child of this context
   *
   * @returns The new context
   */
  createChild(): Context;
}

export default Context;
