import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/api/internal/structures';

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
});
