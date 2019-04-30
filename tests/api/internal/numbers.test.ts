import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, NumberStruct } from '../../../src/api/internal/structures';

describe('Numbers', () => {
  const syntek: Syntek = new Syntek();

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

  it('throws when used as a function', () => {
    expect(() => {
      positiveNumber.exec([]);
    }).to.throw();

    expect(() => {
      negativeNumber.exec([]);
    }).to.throw();
  });

  it('throws when called with new', () => {
    expect(() => {
      positiveNumber.createNew([]);
    }).to.throw();

    expect(() => {
      negativeNumber.createNew([]);
    }).to.throw();
  });

  it('throws when trying to access a property', () => {
    expect(() => {
      positiveNumber.getProperty('x');
    }).to.throw();
  });
});
