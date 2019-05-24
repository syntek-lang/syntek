import Struct from '../struct/Struct';
import Context from '../context/Context';

import { BooleanLiteral } from '..';

type Options = {
  condition?: (this: Context) => Struct;
  body: (this: Context) => void;
}[];

export default class IfFlow {
  constructor(context: Context, options: Options) {
    for (const option of options) {
      let conditionResult = true;

      if (option.condition) {
        const result = option.condition.call(context);

        if (result instanceof BooleanLiteral) {
          conditionResult = result.value;
        } else {
          throw new Error('Condition must return a boolean');
        }
      }

      // If the condition returns true execute the body and stop the flow
      if (conditionResult) {
        option.body.call(context);
        return;
      }
    }
  }
}
