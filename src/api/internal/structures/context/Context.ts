import DataType from '../DataType';
import Struct from '../struct/Struct';
import VariableStruct from '../struct/VariableStruct';
import Utils from '../../utils';

export default class Context {
  /**
   * The upper scope of the current scope
   */
  readonly upperContext?: Context;

  /**
   * The variables in the current scope
   */
  readonly scope: { [s: string]: Struct };

  /**
   * Create a new context object
   *
   * @param upperContext - The upper scope of the current scope
   */
  constructor(upperContext?: Context) {
    this.upperContext = upperContext;
    this.scope = {};
  }

  /**
   * Declare a variable. First tries to reassign an existing variable in the upper or current
   * scope, then declares a new variable. If a variable is already declared provide
   * `DataType.ANY` as it's type
   *
   * @param name - The name of the variable
   * @param type - The type of the variable
   * @param value - The value of the variable
   */
  declareVariable(name: string, type: DataType, value: Struct): void {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      this.upperContext.declareVariable(name, type, value);
      return;
    }

    if (this.scope[name]) {
      // Reassigning variable in the current scope
      const variable = this.scope[name];
      Utils.checkValidReassign(name, type, variable);

      this.scope[name] = new VariableStruct(name, variable.type, value);
      return;
    }

    // Variable has not been declared yet
    this.scope[name] = new VariableStruct(name, type, value);
  }

  /**
   * Get a variable from the current or upper scope
   *
   * @param name - The name of the variable
   * @returns The variable
   */
  getVariable(name: string): Struct {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      return this.upperContext.getVariable(name);
    }

    return this.scope[name];
  }

  /**
   * Check if the current or upper scope contains a variable with the given name
   *
   * @param name - The name of the variable
   * @returns Whether there is a variable with the given name
   */
  hasVariable(name: string): boolean {
    if (this.upperContext && this.upperContext.hasVariable(name)) {
      return true;
    }

    return !!this.scope[name];
  }

  /**
   * Create a child of this context. This will set the upper context of the new context
   * to the current context
   *
   * @returns - The new context
   */
  createChild(): Context {
    return new Context(this);
  }
}