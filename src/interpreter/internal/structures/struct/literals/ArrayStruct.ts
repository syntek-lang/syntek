/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, no-param-reassign */

import {
  StringLiteral, NumberLiteral, DefaultContext, FunctionStruct,
} from '../..';

import Struct from '../Struct';
import Literal from './Literal';

export class ArrayLiteral extends Literal {
  readonly value: Struct[];

  constructor(value: Struct[]) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '+' on an array");
        },
      ),

      $sub: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '-' on an array");
        },
      ),

      $mul: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '*' on an array");
        },
      ),

      $div: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '/' on an array");
        },
      ),

      $mod: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '%' on an array");
        },
      ),

      $pow: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '^' on an array");
        },
      ),

      $eq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare an array with 'is'");
        },
      ),

      $neq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare an array with 'is not'");
        },
      ),

      $lt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare an array with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare an array with 'is greater than'");
        },
      ),

      $and: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'and' on an array");
        },
      ),

      $or: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'or' on an array");
        },
      ),

      $not: new FunctionStruct(
        context,
        [],
        function () {
          throw new Error("You can't use 'not' on an array");
        },
      ),

      $get: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }],
        function () {
          const index = this.get('index');

          if (index instanceof NumberLiteral) {
            this.return(value[index.value]);
          } else {
            throw new Error('Index must be a number');
          }
        },
      ),

      $set: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }, { type: null, name: 'value' }],
        function () {
          const index = this.get('index');

          if (index instanceof NumberLiteral) {
            value[index.value] = this.get('value');
          } else {
            throw new Error('Index must be a number');
          }
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          const strings: string[] = [];

          for (const item of value) {
            try {
              const obj = item.callMethod('toString', []);

              if (obj instanceof StringLiteral) {
                strings.push(obj.value);
              } else {
                strings.push('[unknown]');
              }
            } catch {
              strings.push('[unknown]');
            }
          }

          this.return(new StringLiteral(`[${strings.join(', ')}]`));
        },
      ),

      append: new FunctionStruct(
        context,
        [{ type: null, name: 'element' }],
        function () {
          value.push(this.get('element'));
        },
      ),
    });

    this.value = value;
  }
}
