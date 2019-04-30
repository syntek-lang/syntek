/* eslint-disable prefer-arrow-callback, func-names, max-len */

import Syntek from './Syntek';
import DataType from './structures/DataType';

console.warn('Interpreter start');

const syntek: Syntek = new Syntek();

syntek.context.declareVariable('print', DataType.FUNCTION, syntek.literalHandler.function(
  syntek.context,
  'print',
  [{ type: DataType.ANY, name: 'item' }],
  function () {
    console.log(this.getVariable('item').toString());
  },
  DataType.ANY,
));

syntek.createProgram(function () {
  this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {
    this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    this.declareVariable('MyClass', DataType.FUNCTION, syntek.literalHandler.function(
      this,
      'func',
      [],
      function () {
        console.log('new instance');
      },
      DataType.ANY,
    ));
  }));

  const myClass = this.getVariable('MyClass').createNew([]);
  console.log(myClass.getProperty('x').toNumber());
});

console.warn('Interpreter end');
