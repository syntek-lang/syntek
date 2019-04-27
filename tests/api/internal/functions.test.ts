/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType } from '../../../src/api/internal/structures';

describe('Functions', () => {
  it('handles function parameters correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareFunction('print', [{ type: DataType.ANY, name: 'item' }], function () {
        expect(this.getVariable('item').toNumber()).to.equal(5);
      }, DataType.ANY);

      this.executeFunction('print', [syntek.literalHandler.number(5)]);
    });
  });

  it('prints the correct value', () => {
    const syntek: Syntek = new Syntek();
    const prints: string[] = [];

    syntek.context.declareFunction('print', [{ type: DataType.ANY, name: 'item' }], function () {
      prints.push(this.getVariable('item').toString());
    }, DataType.ANY);

    syntek.createProgram(function () {
      this.declareFunction('printValue', [], function () {
        this.executeFunction('print', [syntek.literalHandler.number(5)]);
      }, DataType.ANY);

      this.executeFunction('printValue', []);
    });

    expect(prints[0]).to.equal('5');
  });

  it('throws an error when parameter type does not match', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.createProgram(function () {
        this.declareFunction('printString', [{ type: DataType.STRING, name: 'string' }], function () {}, DataType.ANY);

        this.executeFunction('printString', [syntek.literalHandler.number(5)]);
      });
    }).to.throw();
  });
});
