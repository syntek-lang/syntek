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
  this.declareVariable('Parent', DataType.CLASS, syntek.literalHandler.class(
    this,
    'Parent',
    function () {
    },
    function () {
      this.declareVariable('toString', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'toString',
        [],
        function () {
          return 'hello';
        },
        DataType.ANY,
      ));

      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
    },
  ));

  this.declareVariable('Child', DataType.CLASS, syntek.literalHandler.class(
    this,
    'Child',
    function () {
    },
    function () {
      this.declareVariable('y', DataType.NUMBER, syntek.literalHandler.number(10));
    },
    this.getVariable('Parent'),
  ));

  console.log(this.getVariable('Parent').createNew([]));
  console.log(this.getVariable('Child').createNew([]));

  console.log(this.getVariable('Parent').createNew([]).getProperty('x').toNumber());
  console.log(this.getVariable('Child').createNew([]).getProperty('x').toNumber());
});

console.warn('Interpreter end');
