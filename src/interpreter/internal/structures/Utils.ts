import Struct from './struct/Struct';
import VariableType from './VariableType';

import { FunctionStruct } from '.';

export default class Utils {
  static checkValidAssign(type: VariableType, value: Struct): void {
    if (type === null || value instanceof type) {
      return;
    }

    throw new Error('Variable is assigned with the wrong type');
  }

  static checkValidReassign(
    name: string,
    oldType: VariableType,
    newType: VariableType,
    value: Struct,
  ): void {
    // Can't declare a function if name already in use
    if (newType === FunctionStruct) {
      throw new Error(`There is already a variable with the name ${name}`);
    }

    // Reassign can't contain a type declaration
    if (newType !== null) {
      throw new Error('You do not have to specify a type when reassigning a variable');
    }

    // Can't reassign functions
    if (oldType === FunctionStruct) {
      throw new Error('You can not reassign a variable declared as a function');
    }

    Utils.checkValidAssign(oldType, value);
  }
}
