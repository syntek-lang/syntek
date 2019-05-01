import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/interpreter/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/interpreter/internal/structures';

describe('Math', () => {
  const syntek: Syntek = new Syntek();

  describe('add', () => {
    it('correctly adds 2 positive numbers', () => {
      const number = syntek.mathHandler.add(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(15);
    });

    it('correctly adds 2 negative numbers', () => {
      const number = syntek.mathHandler.add(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-15);
    });

    it('correctly adds a positive and negative number', () => {
      const number = syntek.mathHandler.add(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(5);
    });

    it('correctly adds a negative and positive number', () => {
      const number = syntek.mathHandler.add(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-5);
    });
  });

  describe('subtract', () => {
    it('correctly subtracts 2 positive numbers', () => {
      const number = syntek.mathHandler.subtract(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(5);
    });

    it('correctly subtracts 2 negative numbers', () => {
      const number = syntek.mathHandler.subtract(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-5);
    });

    it('correctly subtracts a positive and negative number', () => {
      const number = syntek.mathHandler.subtract(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(15);
    });

    it('correctly subtracts a negative and positive number', () => {
      const number = syntek.mathHandler.subtract(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-15);
    });
  });

  describe('multiply', () => {
    it('correctly multiplies 2 positive numbers', () => {
      const number = syntek.mathHandler.multiply(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(50);
    });

    it('correctly multiplies 2 negative numbers', () => {
      const number = syntek.mathHandler.multiply(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(50);
    });

    it('correctly multiplies a positive and negative number', () => {
      const number = syntek.mathHandler.multiply(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-50);
    });

    it('correctly multiplies a negative and positive number', () => {
      const number = syntek.mathHandler.multiply(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-50);
    });
  });

  describe('divide', () => {
    it('correctly divides 2 positive numbers', () => {
      const number = syntek.mathHandler.divide(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(2);
    });

    it('correctly divides 2 negative numbers', () => {
      const number = syntek.mathHandler.divide(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(2);
    });

    it('correctly divides a positive and negative number', () => {
      const number = syntek.mathHandler.divide(
        syntek.literalHandler.number(10),
        syntek.literalHandler.number(-5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-2);
    });

    it('correctly divides a negative and positive number', () => {
      const number = syntek.mathHandler.divide(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-2);
    });
  });

  describe('modulo', () => {
    it('correctly returns the module of 2 positive numbers', () => {
      const number = syntek.mathHandler.modulo(
        syntek.literalHandler.number(12),
        syntek.literalHandler.number(5),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(2);
    });

    it('correctly returns the module of 2 negative numbers', () => {
      const number = syntek.mathHandler.modulo(
        syntek.literalHandler.number(-6),
        syntek.literalHandler.number(-4),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-2);
    });

    it('correctly returns the module of a positive and negative number', () => {
      const number = syntek.mathHandler.modulo(
        syntek.literalHandler.number(11),
        syntek.literalHandler.number(-6),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(5);
    });

    it('correctly returns the module of a negative and positive number', () => {
      const number = syntek.mathHandler.modulo(
        syntek.literalHandler.number(-10),
        syntek.literalHandler.number(6),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(-4);
    });
  });

  describe('pow', () => {
    it('correctly returns the pow of 2 positive numbers', () => {
      const number = syntek.mathHandler.pow(
        syntek.literalHandler.number(2),
        syntek.literalHandler.number(4),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(16);
    });

    it('correctly returns the pow of 2 negative numbers', () => {
      const number = syntek.mathHandler.pow(
        syntek.literalHandler.number(-4),
        syntek.literalHandler.number(-2),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(0.0625);
    });

    it('correctly returns the pow of a positive and negative number', () => {
      const number = syntek.mathHandler.pow(
        syntek.literalHandler.number(2),
        syntek.literalHandler.number(-3),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(0.125);
    });

    it('correctly returns the pow of a negative and positive number', () => {
      const number = syntek.mathHandler.pow(
        syntek.literalHandler.number(-5),
        syntek.literalHandler.number(4),
      );

      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
      expect(number.toNumber()).to.equal(625);
    });
  });
});
