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
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '+' on null");
        },
      ),

      $sub: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '-' on null");
        },
      ),

      $mul: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '*' on null");
        },
      ),

      $div: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '/' on null");
        },
      ),

      $mod: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '%' on null");
        },
      ),

      $pow: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '^' on null");
        },
      ),

      $eq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const equal = this.get('right') instanceof NullLiteral;
          this.return(new BooleanLiteral(equal));
        },
      ),

      $neq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const equal = this.get('right') instanceof NullLiteral;
          this.return(new BooleanLiteral(!equal));
        },
      ),

      $lt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare null with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare null with 'is greater than'");
        },
      ),

      $and: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'and' on null");
        },
      ),

      $or: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'or' on null");
        },
      ),

      $not: new FunctionStruct(
        context,
        [],
        function () {
          throw new Error("You can't use 'not' on null");
        },
      ),

      $get: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }],
        function () {
          throw new Error("You can't use '[]' on null");
        },
      ),

      $set: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }, { type: null, name: 'value' }],
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
