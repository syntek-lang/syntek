/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, import/no-cycle */

import { StringLiteral, BooleanLiteral } from '.';

import Literal from './Literal';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

export class NullLiteral extends Literal {
  readonly value: null;

  constructor() {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '+' on null");
        },
      ),

      $sub: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '-' on null");
        },
      ),

      $mul: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '*' on null");
        },
      ),

      $div: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '/' on null");
        },
      ),

      $mod: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '%' on null");
        },
      ),

      $pow: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '^' on null");
        },
      ),

      $eq: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');
          return new BooleanLiteral(right instanceof NullLiteral);
        },
      ),

      $lt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare null with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare null with 'is greater than'");
        },
      ),

      $get: new FunctionStruct(
        context,
        ['index'],
        function () {
          throw new Error("You can't use '[]' on null");
        },
      ),

      $set: new FunctionStruct(
        context,
        ['index', 'value'],
        function () {
          throw new Error("You can't use '[]' on null");
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral('null');
        },
      ),
    });

    this.value = null;
  }
}
