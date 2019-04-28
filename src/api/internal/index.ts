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
  this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

  this.declareVariable('obj', DataType.OBJECT, syntek.literalHandler.object(this, function () {
    this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));

    this.declareVariable('changeX', DataType.FUNCTION, syntek.literalHandler.function(
      this,
      'changeX',
      [],
      function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(15));
      },
      DataType.ANY,
    ));

    this.declareVariable('nested', DataType.OBJECT, syntek.literalHandler.object(this, function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(20));

      this.declareVariable('changeX', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'changeX',
        [],
        function () {
          this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(30));
        },
        DataType.ANY,
      ));
    }));
  }));

  console.log(this);
  console.log('x stays 5?', this.getVariable('x').toNumber() === 5);
  console.log('obj.x equals 10?', this.getVariable('obj').getProperty('x').toNumber() === 10);

  this.getVariable('obj').getProperty('changeX').exec([]);

  console.log('x is 15?', this.getVariable('x').toNumber() === 15);
  console.log('obj.x stayed 10?', this.getVariable('obj').getProperty('x').toNumber() === 10);

  console.log(this.getVariable('obj').getProperty('nested').getProperty('x'));
  this.getVariable('obj').getProperty('nested').getProperty('changeX').exec([]);

  console.log('x is 30?', this.getVariable('x').toNumber() === 30);
  console.log('obj.x stayed 10?', this.getVariable('obj').getProperty('x').toNumber() === 10);
  console.log(this.getVariable('obj').getProperty('nested').getProperty('x'));
});

console.warn('Interpreter end');
