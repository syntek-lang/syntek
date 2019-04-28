/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/api/internal/structures';

describe('Functions', () => {
  it('handles function parameters correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('print', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'print',
        [{ type: DataType.ANY, name: 'item' }],
        function () {
          expect(this.getVariable('item').toNumber()).to.equal(5);
        },
        DataType.ANY,
      ));

      this.getVariable('print').exec([syntek.literalHandler.number(5)]);
    });
  });

  it('throws an error when parameter type does not match', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.createProgram(function () {
        this.declareVariable('printString', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'print',
          [{ type: DataType.STRING, name: 'string' }],
          function () {},
          DataType.ANY,
        ));

        this.getVariable('printString').exec([syntek.literalHandler.number(5)]);
      });
    }).to.throw();
  });

  it('handles returns correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('get5', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'get5',
        [],
        function () {
          return syntek.literalHandler.number(5);
        },
        DataType.NUMBER,
      ));

      const num: NumberStruct = this.getVariable('get5').exec([]);
      expect(num).to.be.an.instanceof(NumberStruct);
      expect(num.toNumber()).to.equal(5);
    });
  });

  it('throws an error when return type does not match', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.createProgram(function () {
        this.declareVariable('returnString', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'returnString',
          [],
          function () {
            return syntek.literalHandler.number(5);
          },
          DataType.STRING,
        ));

        this.getVariable('returnString').exec([]);
      });
    }).to.throw();
  });

  it('overrides variable outside of scope if possible', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

      this.declareVariable('changeX', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'changeX',
        [],
        function () {
          this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));
        },
        DataType.ANY,
      ));

      expect(this.getVariable('x').toNumber()).to.equal(5);
      this.getVariable('changeX').exec([]);
      expect(this.getVariable('x').toNumber()).to.equal(10);
    });
  });
});
