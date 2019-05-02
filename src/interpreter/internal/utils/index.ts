import DataType from '../structures/DataType';
import Struct from '../structures/struct/Struct';

export default class Utils {
  /**
   * Check if a variable reassign is valid
   *
   * @param name - The name of the variable
   * @param type - The type of the new variable
   * @param declaredVariable - The variable that is being reassigned
   */
  static checkValidReassign(name: string, type: DataType, declaredVariable: Struct): void {
    if (type === DataType.FUNCTION || type === DataType.MODULE) {
      throw new Error(`There is already a variable with the name ${name}`);
    }

    if (type !== DataType.ANY) {
      throw new Error('You do not have to specify a type when reassigning a variable');
    }

    if (declaredVariable.type === DataType.FUNCTION) {
      throw new Error('You can not reassign a variable declared as a function');
    }

    if (declaredVariable.type === DataType.MODULE) {
      throw new Error('You can not reassign a variable declared as a module');
    }
  }
}
