/* eslint-disable prefer-arrow-callback, func-names, max-len */

import Syntek from './Syntek';
import DataType from './structures/DataType';

console.warn('Interpreter start');

/*

function printValues()
  sum = 5
  print(sum)
  sum = sum + 10
  print(sum)

printValues()

*/

const syntek: Syntek = new Syntek();

syntek.context.declareFunction('print', [{ type: DataType.ANY, name: 'item' }], function () {
  console.log(this.getVariable('item').toString());
}, DataType.ANY);

syntek.createProgram(function () {
  this.declareFunction('printValues', [], function () {
    this.declareVariable('sum', syntek.literalHandler.number(5));

    this.executeFunction('print', [this.getVariable('sum')]);

    this.declareVariable('sum', syntek.mathHandler.add(
      this.getVariable('sum'),
      syntek.literalHandler.number(10),
    ));

    this.executeFunction('print', [this.getVariable('sum')]);
  }, DataType.ANY);

  this.executeFunction('printValues', []);
});

console.warn('Interpreter end');
