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
  this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {
    this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    console.log('Static', this);
  }, function () {
    this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));

    console.log('Instance', this);
  }));

  // Get static property x
  console.log(this.getVariable('MyClass').getProperty('x').toNumber());

  // Create a new instance and get instance property x
  this.declareVariable('myClass', DataType.OBJECT, this.getVariable('MyClass').createNew([]));
  console.log(this.getVariable('myClass').getProperty('x').toNumber());
});

console.warn('Interpreter end');
