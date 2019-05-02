/* eslint-disable prefer-arrow-callback, func-names, max-len */

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

syntek.declareModule('builtins', function () {
  this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(91));
});

syntek.createProgram(function () {
  this.declareVariable('builtins', DataType.MODULE, syntek.getModule('builtins'));

  this.getVariable('print').exec([this.getVariable('builtins').getProperty('x')]);
});

console.log(syntek);

console.warn('Interpreter end');
