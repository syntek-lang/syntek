/* eslint-disable prefer-arrow-callback, func-names, max-len */

import Syntek from './Syntek';
import DataType from './structures/DataType';

console.warn('Interpreter start');

const syntek: Syntek = new Syntek();

syntek.context.declareFunction('print', [{ type: DataType.ANY, name: 'item' }], function () {
  console.log(this.getVariable('item').toString());
}, DataType.ANY);

syntek.createProgram(function () {
  this.declareVariable('car', syntek.literalHandler.object(this, function () {
    this.declareVariable('model', syntek.literalHandler.number(500));

    this.declareFunction('honk', [], function () {
      this.getVariable('print').exec(this, [syntek.literalHandler.number(5)]);
    }, DataType.ANY);

    this.declareVariable('nested', syntek.literalHandler.object(this, function () {
      this.declareVariable('num', syntek.literalHandler.number(10));
    }));
  }));

  this.getVariable('car').getProperty('honk').exec(this, []);
  this.getVariable('print').exec(this, [this.getVariable('car').getProperty('nested').getProperty('num')]);
});

console.warn('Interpreter end');
