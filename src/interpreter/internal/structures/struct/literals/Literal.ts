/* eslint-disable func-names */

import Struct from '../Struct';
import Utils from '../../../../../utils';
import ObjectStruct from '../ObjectStruct';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

abstract class Literal extends ObjectStruct {
  constructor(members: {
    // Math methods
    $add: FunctionStruct;
    $sub: FunctionStruct;
    $mul: FunctionStruct;
    $div: FunctionStruct;
    $mod: FunctionStruct;
    $pow: FunctionStruct;

    // Comparison methods
    $eq: FunctionStruct;
    $lt: FunctionStruct;
    $gt: FunctionStruct;

    // Array methods
    $get: FunctionStruct;
    $set: FunctionStruct;

    // Others
    toString: FunctionStruct;
    [s: string]: Struct;
  }) {
    super(new DefaultContext(), function () {
      for (const [name, struct] of Utils.objectEntries(members)) {
        this.declare(name, struct.constructor, struct);
      }
    });
  }
}

export default Literal;
