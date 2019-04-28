/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/api/internal/structures';

describe('Functions', () => {
  it('handles function parameters correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareFunction('print', [{ type: DataType.ANY, name: 'item' }], function () {
        expect(this.getVariable('item').toNumber()).to.equal(5);
      }, DataType.ANY);

      this.getVariable('print').exec(this, [syntek.literalHandler.number(5)]);
    });
  });

  it('throws an error when parameter type does not match', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.createProgram(function () {
        this.declareFunction('printString', [{ type: DataType.STRING, name: 'string' }], function () {}, DataType.ANY);

        this.getVariable('printString').exec(this, [syntek.literalHandler.number(5)]);
      });
    }).to.throw();
  });

  it('handles returns correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareFunction('get5', [], function () {
        return syntek.literalHandler.number(5);
      }, DataType.NUMBER);

      const num: NumberStruct = this.getVariable('get5').exec(this, []);
      expect(num).to.be.an.instanceof(NumberStruct);
      expect(num.toNumber()).to.equal(5);
    });
  });

  it('throws an error when return type does not match', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.createProgram(function () {
        this.declareFunction('returnString', [], function () {
          return syntek.literalHandler.number(5);
        }, DataType.STRING);

        this.getVariable('returnString').exec(this, []);
      });
    }).to.throw();
  });
});
