import Struct from '../struct/Struct';
import Context from '../context/Context';

import { ArrayLiteral, StringLiteral } from '..';

type Body = (this: Context) => void;

export default class ForFlow {
  constructor(context: Context, variableName: string, iterable: Struct, body: Body) {
    if (iterable instanceof ArrayLiteral) {
      for (let i = 0; i < iterable.value.length; i += 1) {
        context.declare(variableName, null, iterable.value[i]);

        body.call(context);

        // Return and break stop execution
        if (context.hasReturn || context.hasBreak) {
          return;
        }
      }

      return;
    }

    if (iterable instanceof StringLiteral) {
      for (let i = 0; i < iterable.value.length; i += 1) {
        context.declare(variableName, null, new StringLiteral(iterable.value[i]));

        body.call(context);

        // Return and break stop execution
        if (context.hasReturn || context.hasBreak) {
          return;
        }
      }

      return;
    }

    throw new Error('You can only loop over arrays and strings');
  }
}
