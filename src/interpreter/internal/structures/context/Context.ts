import Struct from '../struct/Struct';
import VariableType from '../VariableType';

interface Context {
  /**
   * Whether return has been called
   */
  hasReturn: boolean;

  /**
   * Whether break has been called
   */
  hasBreak: boolean;

  /**
   * Whether continue has been called
   */
  hasContinue: boolean;

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
   * @param type - The type of the variable
   * @param value - The value of the variable
   */
  declare(name: string, type: VariableType, value: Struct): void;

  /**
   * Check if a variable with the given name exists in the context, or upper context
   *
   * @param name - The name of the variable
   * @returns Whether the variable exists
   */
  has(name: string): boolean;

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

  /**
   * Return statement
   *
   * @param returnValue - The structure to return
   */
  return(returnValue?: Struct): void;

  /**
   * Break statement
   */
  break(): void;

  /**
   * Continue statement
   */
  continue(): void;
}

export default Context;
