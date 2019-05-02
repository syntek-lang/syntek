/* eslint-disable prefer-arrow-callback, func-names */

import Syntek from './Syntek';
import DataType from './structures/DataType';

console.warn('Interpreter start');

const syntek: Syntek = new Syntek();

syntek.globalContext.declareVariable('print', DataType.FUNCTION, syntek.literalHandler.function(
  syntek.globalContext,
  'print',
  [{ type: DataType.ANY, name: 'item' }],
  function () {
    console.log(this.getVariable('item').toString());
  },
  DataType.ANY,
));

syntek.createProgram(function () {
  this.declareVariable('obj', DataType.OBJECT, syntek.literalHandler.object(this, function () {
    this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    this.declareVariable('toString', DataType.FUNCTION, syntek.literalHandler.function(
      this,
      'toString',
      [],
      function () {
        return syntek.literalHandler.number(123);
      },
      DataType.NUMBER,
    ));
  }));

  console.log(this.getVariable('obj'));
  this.getVariable('print').exec([this.getVariable('obj')]);
});

console.warn('Interpreter end');
