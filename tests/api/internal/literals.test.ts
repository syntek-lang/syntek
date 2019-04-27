import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/api/internal/structures';

describe('Literals', () => {
  const syntek: Syntek = new Syntek();

  describe('number', () => {
    const number = syntek.literalHandler.number(5);

    it('creates an object correctly', () => {
      expect(number).to.be.an.instanceof(NumberStruct);
      expect(number.type).to.equal(DataType.NUMBER);
    });

    it('correctly turns into a string', () => {
      expect(number.toString()).to.equal('5');
    });

    it('correctly turns into a number', () => {
      expect(number.toNumber()).to.equal(5);
    });

    it('throws an error when used as a function', () => {
      expect(number.exec).to.throw();
    });
  });
});
