/* eslint-disable func-names, no-new */

import * as s from './structures';

console.warn('Interpreter start');

const context = new s.DefaultContext();
context.declare('print', new s.FunctionStruct(context, ['param'], function () {
  console.log(this.get('param'));
}));

context.declare('main', new s.FunctionStruct(context, [], function () {
  this.declare('x', new s.NumberLiteral(5));

  new s.IfFlow(this, [
    {
      condition() {
        return this.get('x').callMethod('$eq', [new s.NumberLiteral(5)]);
      },
      body() {
        this.get('print').exec([new s.StringLiteral('First check')]);
      },
    },
    {
      condition() {
        return this.get('x').callMethod('$eq', [new s.NumberLiteral(6)]);
      },
      body() {
        this.get('print').exec([new s.StringLiteral('Second check')]);
      },
    },
    {
      body() {
        this.get('print').exec([new s.StringLiteral('Final check')]);
      },
    },
  ]);
  if (this.hasReturn) return;

  this.get('print').exec([new s.StringLiteral('After the loop')]);
}));

console.log(context.get('main').exec([]));
console.log(s);

console.warn('Interpreter end');
