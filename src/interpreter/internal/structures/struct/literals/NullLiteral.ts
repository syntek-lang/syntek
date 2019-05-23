/* eslint-disable func-names, prefer-arrow-callback, import/prefer-default-export */

import {
  StringLiteral, BooleanLiteral, DefaultContext, FunctionStruct,
} from '../..';

import Literal from './Literal';

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
          this.return(new BooleanLiteral(this.get('right') instanceof NullLiteral));
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
          this.return(new StringLiteral('null'));
        },
      ),
    });

    this.value = null;
  }
}
