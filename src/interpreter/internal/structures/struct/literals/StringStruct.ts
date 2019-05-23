/* eslint-disable func-names, prefer-arrow-callback, import/prefer-default-export */

import { BooleanLiteral, DefaultContext, FunctionStruct } from '../..';

import Literal from './Literal';

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
          this.return(new StringLiteral(value));
        },
      ),

      equals: new FunctionStruct(
        context,
        ['string'],
        function () {
          const string = this.get('string');
          const equals = string instanceof StringLiteral && value === string.value;

          this.return(new BooleanLiteral(equals));
        },
      ),

      append: new FunctionStruct(
        context,
        ['string'],
        function () {
          const string = this.get('string');

          if (string instanceof StringLiteral) {
            this.return(new StringLiteral(value + string.value));
          } else {
            throw new Error('You can only append strings');
          }
        },
      ),

      toLowerCase: new FunctionStruct(
        context,
        [],
        function () {
          this.return(new StringLiteral(value.toLowerCase()));
        },
      ),

      toUpperCase: new FunctionStruct(
        context,
        [],
        function () {
          this.return(new StringLiteral(value.toUpperCase()));
        },
      ),
    });

    this.value = value;
  }
}
