import Context from './Context';
import Utils from '../../utils';
import DataType from '../DataType';
import Struct from '../struct/Struct';
import DefaultContext from './DefaultContext';
import { LiteralHandler } from '../../handlers';
import VariableStruct from '../struct/VariableStruct';

export default class ObjectContext implements Context {
  /**
   * The context outside of the object context
   */
  readonly outerContext: Context;

  /**
   * The context of the parent object
   */
  readonly parentObjectContext?: ObjectContext;

  /**
   * The variables in the current scope
   */
  readonly scope: { [s: string]: VariableStruct };

  /**
   * Create a new context object for objects. This does not contain an upper context,
   * which allows objects to also declare variables that are also in the upper scope
   *
   * @param outerContext - The context outside of the object context. In theory the
   * same as uppercontext.
   * @param parentObjectContext - The context of the parent object
   */
  constructor(outerContext: Context, parentObjectContext?: ObjectContext) {
    this.outerContext = outerContext;
    this.parentObjectContext = parentObjectContext;

    this.scope = {};
  }

  getVariables(): [string, Struct][] {
    const variables: [string, Struct][] = [];

    for (const name of Object.keys(this.scope)) {
      variables.push([name, this.scope[name]]);
    }

    // TODO: Merge variables declared in parent context

    return variables;
  }

  declareVariable(name: string, type: DataType, value: Struct): void {
    if (this.hasOwnVariable(name)) {
      // Reassigning variable in the current scope
      const variable = this.scope[name];
      Utils.checkValidReassign(name, type, variable);

      this.scope[name] = new VariableStruct(name, variable.type, value);
      return;
    }

    // Variable has not been declared yet
    this.scope[name] = new VariableStruct(name, type, value);
  }

  getVariable(name: string): Struct {
    if (!this.hasOwnVariable(name)) {
      // Check if parent has the variable
      if (this.parentObjectContext && this.parentObjectContext.hasVariable(name)) {
        return this.parentObjectContext.getVariable(name);
      }

      // Throw error if the variable does not exist
      throw new Error(`Variable ${name} does not exist`);
    }

    return this.scope[name];
  }

  hasVariable(name: string): boolean {
    if (this.parentObjectContext && this.parentObjectContext.hasVariable(name)) {
      return true;
    }

    return this.hasOwnVariable(name);
  }

  hasOwnVariable(name: string): boolean {
    return this.scope.hasOwnProperty(name);
  }

  /**
   * Create a child of the object context. This returns a child of the outer context,
   * such that functions have access to the outer scope instead of the object scope
   *
   * @returns A child of the outer scope
   */
  createChild(): Context {
    const context = this.outerContext.createChild();
    const variables = this.getVariables();

    // Assign all object properties to the `this` object
    // The `this` object has it's own empty context
    context.declareVariable('this', DataType.OBJECT, LiteralHandler.object(new DefaultContext(), function objectBuilder() {
      for (const [name, value] of variables) {
        this.declareVariable(name, value.type, value);
      }
    }));

    return context;
  }
}
