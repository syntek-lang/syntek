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

syntek.declarationHandler.declareFunction('print', [DataType.ANY], function (item) {
  console.log(item.toString());
});

syntek.declarationHandler.declareFunction('main', [], function () {
  syntek.declarationHandler.declareFunction('printValues', [], function () {
    syntek.declarationHandler.declareVariable('sum', syntek.literalHandler.number(5));

    syntek.declarationHandler.executeFunction('print', [syntek.declarationHandler.getVariable('sum')]);

    syntek.declarationHandler.declareVariable('sum', syntek.mathHandler.add(
      syntek.declarationHandler.getVariable('sum'),
      syntek.literalHandler.number(10),
    ));

    syntek.declarationHandler.executeFunction('print', [syntek.declarationHandler.getVariable('sum')]);
  });

  syntek.declarationHandler.executeFunction('printValues', []);
});

syntek.run();

console.warn('Interpreter end');
