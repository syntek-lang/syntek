/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/interpreter/internal/Syntek';
import { DataType, VariableStruct } from '../../../src/interpreter/internal/structures';

describe('Repeat', () => {
  const syntek: Syntek = new Syntek();

  it('repeats the provided amount of times', () => {
    syntek.createProgram(function () {
      let i = 0;

      syntek.literalHandler.repeat(this, syntek.literalHandler.number(5), function () {
        i += 1;
      });

      expect(i).to.equal(5);
    });
  });

  it('can update variables declared outside of the repeat', () => {
    syntek.createProgram(function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(7));

      syntek.literalHandler.repeat(this, syntek.literalHandler.number(3), function () {
        this.declareVariable('x', DataType.ANY, syntek.mathHandler.add(
          this.getVariable('x'),
          syntek.literalHandler.number(1),
        ));
      });

      const x = this.getVariable('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(10);
    });
  });

  it('declares variables outside it\'s own scope', () => {
    syntek.createProgram(function () {
      syntek.literalHandler.repeat(this, syntek.literalHandler.number(7), function () {
        this.declareVariable('x', DataType.ANY, syntek.literalHandler.number(3));
      });

      const x = this.getVariable('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.ANY);
      expect(x.toNumber()).to.equal(3);
    });
  });

  it('repeats the correct amount when nested', () => {
    syntek.createProgram(function () {
      let i = 0;
      let j = 0;

      syntek.literalHandler.repeat(this, syntek.literalHandler.number(3), function () {
        i += 1;

        syntek.literalHandler.repeat(this, syntek.literalHandler.number(2), function () {
          j += 1;
        });
      });

      expect(i).to.equal(3);
      expect(j).to.equal(6);
    });
  });
});
