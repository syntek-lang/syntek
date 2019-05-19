/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, import/no-cycle */

import { StringLiteral } from '.';

import Literal from './Literal';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

export class BooleanLiteral extends Literal {
  readonly value: boolean;

  constructor(value: boolean) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '+' on a boolean");
        },
      ),

      $sub: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '-' on a boolean");
        },
      ),

      $mul: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '*' on a boolean");
        },
      ),

      $div: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '/' on a boolean");
        },
      ),

      $mod: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '%' on a boolean");
        },
      ),

      $pow: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '^' on a boolean");
        },
      ),

      $eq: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof BooleanLiteral && value === right.value;

          return new BooleanLiteral(isEqual);
        },
      ),

      $lt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare a boolean with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare a boolean with 'is greater than'");
        },
      ),

      $get: new FunctionStruct(
        context,
        ['index'],
        function () {
          throw new Error("You can't use '[]' on a boolean");
        },
      ),

      $set: new FunctionStruct(
        context,
        ['index', 'value'],
        function () {
          throw new Error("You can't use '[]' on a boolean");
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral(value.toString());
        },
      ),
    });

    this.value = value;
  }
}
