/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { Context } from '../../../src/api/internal/handlers';
import {
  DataType, NumberStruct, ObjectStruct, FunctionStruct, VariableStruct,
} from '../../../src/api/internal/structures';

describe('Literals', () => {
  const syntek: Syntek = new Syntek();

  describe('number', () => {
    const positiveNumber = syntek.literalHandler.number(5);
    const negativeNumber = syntek.literalHandler.number(-10);

    it('creates an object correctly', () => {
      expect(positiveNumber).to.be.an.instanceof(NumberStruct);
      expect(positiveNumber.type).to.equal(DataType.NUMBER);

      expect(negativeNumber).to.be.an.instanceof(NumberStruct);
      expect(negativeNumber.type).to.equal(DataType.NUMBER);
    });

    it('correctly turns into a string', () => {
      expect(positiveNumber.toString()).to.equal('5');
      expect(negativeNumber.toString()).to.equal('-10');
    });

    it('correctly turns into a number', () => {
      expect(positiveNumber.toNumber()).to.equal(5);
      expect(negativeNumber.toNumber()).to.equal(-10);
    });

    it('throws an error when used as a function', () => {
      expect(positiveNumber.exec).to.throw();
      expect(negativeNumber.exec).to.throw();
    });
  });

  describe('object', () => {
    it('creates an object correctly', () => {
      const object = syntek.literalHandler.object(new Context(), function () {});

      expect(object).to.be.an.instanceof(ObjectStruct);
      expect(object.type).to.equal(DataType.OBJECT);
    });

    it('correctly stores function declarations', () => {
      const object = syntek.literalHandler.object(new Context(), function () {
        this.declareFunction('fn', [], function () {
          return syntek.literalHandler.number(5);
        }, DataType.NUMBER);
      });

      const fn = object.getProperty('fn');
      expect(fn).to.be.an.instanceof(FunctionStruct);
      expect(fn.type).to.equal(DataType.FUNCTION);

      const returnValue: NumberStruct = fn.exec(new Context(), []);
      expect(returnValue).to.be.an.instanceof(NumberStruct);
      expect(returnValue.toNumber()).to.equal(5);
    });

    it('correctly stores variable declarations', () => {
      const object = syntek.literalHandler.object(new Context(), function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      });

      const x = object.getProperty('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);
    });

    it('correctly stores object declarations', () => {
      const object = syntek.literalHandler.object(new Context(), function () {
        this.declareVariable('nested', DataType.OBJECT, syntek.literalHandler.object(this, function () {
          this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
        }));
      });

      const nested = object.getProperty('nested');
      expect(nested).to.be.an.instanceof(VariableStruct);
      expect(nested.type).to.equal(DataType.OBJECT);

      const x = nested.getProperty('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);
    });
  });
});
