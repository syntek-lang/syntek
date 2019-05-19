/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, import/no-cycle, no-param-reassign */

import { StringLiteral, NullLiteral, NumberLiteral } from '.';

import Struct from '../Struct';
import Literal from './Literal';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

export class ArrayLiteral extends Literal {
  readonly value: Struct[];

  constructor(value: Struct[]) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '+' on an array");
        },
      ),

      $sub: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '-' on an array");
        },
      ),

      $mul: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '*' on an array");
        },
      ),

      $div: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '/' on an array");
        },
      ),

      $mod: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '%' on an array");
        },
      ),

      $pow: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '^' on an array");
        },
      ),

      $eq: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare an array with 'is'");
        },
      ),

      $lt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare an array with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare an array with 'is greater than'");
        },
      ),

      $get: new FunctionStruct(
        context,
        ['index'],
        function () {
          const index = this.get('index');

          if (index instanceof NumberLiteral) {
            return value[index.value] || new NullLiteral();
          }

          throw new Error('Index must be a number');
        },
      ),

      $set: new FunctionStruct(
        context,
        ['index', 'value'],
        function () {
          const index = this.get('index');

          if (index instanceof NumberLiteral) {
            value[index.value] = this.get('value');
            return new NullLiteral();
          }

          throw new Error('Index must be a number');
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral(`[${value.join(', ')}]`);
        },
      ),

      append: new FunctionStruct(
        context,
        ['element'],
        function () {
          value.push(this.get('element'));
          return new NullLiteral();
        },
      ),
    });

    this.value = value;
  }
}
