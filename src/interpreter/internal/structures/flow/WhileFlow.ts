import Struct from '../struct/Struct';
import Context from '../context/Context';

import { BooleanLiteral } from '..';

type Condition = (this: Context) => Struct;
type Body = (this: Context) => void;

export default class WhileFlow {
  constructor(context: Context, condition: Condition, body: Body) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const conditionResult: Struct = condition.call(context);

      if (!(conditionResult instanceof BooleanLiteral)) {
        throw new Error('Condition must return a boolean');
      }

      // If the condition is false return
      if (!conditionResult.value) {
        return;
      }

      body.call(context);

      // Return and break stop execution
      if (context.hasReturn || context.hasBreak) {
        return;
      }
    }
  }
}
