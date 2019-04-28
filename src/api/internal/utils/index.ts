import DataType from '../structures/DataType';
import Struct from '../structures/struct/Struct';

export default class Utils {
  static checkValidReassign(name: string, type: DataType, declaredVariable: Struct): void {
    if (type === DataType.FUNCTION) {
      throw new Error(`There is already a variable with the name ${name}`);
    }

    if (type !== DataType.ANY) {
      throw new Error('You do not have to specify a type when reassigning a variable');
    }

    if (declaredVariable.type === DataType.FUNCTION) {
      throw new Error('You can not reassign a variable declared as a function');
    }
  }
}
