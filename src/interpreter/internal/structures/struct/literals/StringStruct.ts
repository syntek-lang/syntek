/* eslint-disable func-names, prefer-arrow-callback,
import/prefer-default-export, import/no-cycle */

import { BooleanLiteral } from '.';

import Literal from './Literal';
import FunctionStruct from '../FunctionStruct';
import DefaultContext from '../../context/DefaultContext';

export class StringLiteral extends Literal {
  readonly value: string;

  constructor(value: string) {
    const context = new DefaultContext();

    super({
      $add: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '+' on a string. Did you mean String#append?");
        },
      ),

      $sub: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '-' on a string");
        },
      ),

      $mul: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '*' on a string");
        },
      ),

      $div: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '/' on a string");
        },
      ),

      $mod: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '%' on a string");
        },
      ),

      $pow: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't use '^' on a string");
        },
      ),

      $eq: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare a string with 'is'. Did you mean String#equals?");
        },
      ),

      $lt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare a string with 'is less than'");
        },
      ),

      $gt: new FunctionStruct(
        context,
        ['right'],
        function () {
          throw new Error("You can't compare a string with 'is greater than'");
        },
      ),

      $get: new FunctionStruct(
        context,
        ['index'],
        function () {
          throw new Error("You can't use '[]' on a string");
        },
      ),

      $set: new FunctionStruct(
        context,
        ['index', 'value'],
        function () {
          throw new Error("You can't use '[]' on a string");
        },
      ),

      toString: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral(value);
        },
      ),

      equals: new FunctionStruct(
        context,
        ['string'],
        function () {
          const string = this.get('string');
          const equals = string instanceof StringLiteral && value === string.value;

          return new BooleanLiteral(equals);
        },
      ),

      append: new FunctionStruct(
        context,
        ['string'],
        function () {
          const string = this.get('obj');

          if (string instanceof StringLiteral) {
            return new StringLiteral(value + string.value);
          }

          throw new Error('You can only append strings');
        },
      ),

      toLowerCase: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral(value.toLowerCase());
        },
      ),

      toUpperCase: new FunctionStruct(
        context,
        [],
        function () {
          return new StringLiteral(value.toUpperCase());
        },
      ),
    });

    this.value = value;
  }
}
