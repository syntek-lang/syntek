/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, import/no-cycle */

import { StringLiteral, BooleanLiteral } from '.';

import Literal from './Literal';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

export class NumberLiteral extends Literal {
  readonly value: number;

  constructor(value: number) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value + right.value);
          }

          throw new Error("You can't add a non-number");
        },
      ),

      $sub: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value - right.value);
          }

          throw new Error("You can't subtract a non-number");
        },
      ),

      $mul: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value * right.value);
          }

          throw new Error("You can't multiply a non-number");
        },
      ),

      $div: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value / right.value);
          }

          throw new Error("You can't divide a non-number");
        },
      ),

      $mod: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value % right.value);
          }

          throw new Error("You can't modulo a non-number");
        },
      ),

      $pow: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');

          if (right instanceof NumberLiteral) {
            return new NumberLiteral(value ** right.value);
          }

          throw new Error("You can't pow a non-number");
        },
      ),

      $eq: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');
          const isEqual = right instanceof NumberLiteral && value === right.value;

          return new BooleanLiteral(isEqual);
        },
      ),

      $lt: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');
          const isLessThan = right instanceof NumberLiteral && value < right.value;

          return new BooleanLiteral(isLessThan);
        },
      ),

      $gt: new FunctionStruct(
        context,
        ['right'],
        function () {
          const right = this.get('right');
          const isGreaterThan = right instanceof NumberLiteral && value > right.value;

          return new BooleanLiteral(isGreaterThan);
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
