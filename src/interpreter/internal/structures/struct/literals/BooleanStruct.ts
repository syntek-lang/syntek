/* eslint-disable func-names, prefer-arrow-callback, import/prefer-default-export */

import { StringLiteral, DefaultContext, FunctionStruct } from '../..';

import Literal from './Literal';

export class BooleanLiteral extends Literal {
  readonly value: boolean;

  constructor(value: boolean) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '+' on a boolean");
        },
      ),

      $sub: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '-' on a boolean");
        },
      ),

      $mul: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '*' on a boolean");
        },
      ),

      $div: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '/' on a boolean");
        },
      ),

      $mod: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '%' on a boolean");
        },
      ),

      $pow: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use '^' on a boolean");
        },
      ),

      $eq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof BooleanLiteral && value === right.value;

          this.return(new BooleanLiteral(isEqual));
        },
      ),

      $neq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof BooleanLiteral && value === right.value;

          this.return(new BooleanLiteral(!isEqual));
        },
      ),

      $lt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare a boolean with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't compare a boolean with 'is greater than'");
        },
      ),

      $and: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const and = value && right instanceof BooleanLiteral && right.value;

          this.return(new BooleanLiteral(and));
        },
      ),

      $or: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const or = value || (right instanceof BooleanLiteral && right.value);

          this.return(new BooleanLiteral(or));
        },
      ),

      $not: new FunctionStruct(
        context,
        [],
        function () {
          this.return(new BooleanLiteral(!value));
        },
      ),

      $get: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }],
        function () {
          throw new Error("You can't use '[]' on a boolean");
        },
      ),

      $set: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }, { type: null, name: 'value' }],
        function () {
          throw new Error("You can't use '[]' on a boolean");
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          this.return(new StringLiteral(value.toString()));
        },
      ),
    });

    this.value = value;
  }
}
