/* eslint-disable func-names */

import * as s from '../internal/structures';
import Interpreter from '../internal/Interpreter';

export default function declareGlobals(interpreter: Interpreter): void {
  (function () {
    this.declare('print', s.FunctionStruct, new s.FunctionStruct(this, [{ type: null, name: 'obj' }], function () {
      let string;
      try {
        const obj = this.get('obj').callMethod('toString', []);

        if (obj instanceof s.StringLiteral) {
          string = obj.value;
        }
      } catch {} finally { // eslint-disable-line no-empty
        console.log(string || '[unknown]');
      }
    }));
  }).call(interpreter.globalContext);
}
