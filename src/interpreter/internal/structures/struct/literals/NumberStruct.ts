/* eslint-disable func-names, prefer-arrow-callback, import/prefer-default-export */

import {
  StringLiteral, BooleanLiteral, DefaultContext, FunctionStruct,
} from '../..';

import Literal from './Literal';

export class NumberLiteral extends Literal {
  readonly value: number;

  constructor(value: number) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value + right.value));
          } else {
            throw new Error("You can't add a non-number");
          }
        },
      ),

      $sub: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value - right.value));
          } else {
            throw new Error("You can't subtract a non-number");
          }
        },
      ),

      $mul: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value * right.value));
          } else {
            throw new Error("You can't multiply a non-number");
          }
        },
      ),

      $div: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value / right.value));
          } else {
            throw new Error("You can't divide a non-number");
          }
        },
      ),

      $mod: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value % right.value));
          } else {
            throw new Error("You can't modulo a non-number");
          }
        },
      ),

      $pow: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            this.return(new NumberLiteral(value ** right.value));
          } else {
            throw new Error("You can't pow a non-number");
          }
        },
      ),

      $eq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof NumberLiteral && value === right.value;

          this.return(new BooleanLiteral(isEqual));
        },
      ),

      $neq: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof NumberLiteral && value === right.value;

          this.return(new BooleanLiteral(!isEqual));
        },
      ),

      $lt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isLessThan = right instanceof NumberLiteral && value < right.value;

          this.return(new BooleanLiteral(isLessThan));
        },
      ),

      $gt: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          const right = this.get('right');
          const isGreaterThan = right instanceof NumberLiteral && value > right.value;

          this.return(new BooleanLiteral(isGreaterThan));
        },
      ),

      $and: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'and' on a number");
        },
      ),

      $or: new FunctionStruct(
        context,
        [{ type: null, name: 'right' }],
        function () {
          throw new Error("You can't use 'or' on a number");
        },
      ),

      $not: new FunctionStruct(
        context,
        [],
        function () {
          throw new Error("You can't use 'not' on a number");
        },
      ),

      $get: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }],
        function () {
          throw new Error("You can't use '[]' on a number");
        },
      ),

      $set: new FunctionStruct(
        context,
        [{ type: null, name: 'index' }, { type: null, name: 'value' }],
        function () {
          throw new Error("You can't use '[]' on a number");
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
