/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import {
  DataType, NumberStruct, ObjectStruct, VariableStruct, Context,
} from '../../../src/api/internal/structures';

describe('Objects', () => {
  it('creates an object correctly', () => {
    const syntek: Syntek = new Syntek();
    const object = syntek.literalHandler.object(new Context(), function () {});

    expect(object).to.be.an.instanceof(ObjectStruct);
    expect(object.type).to.equal(DataType.OBJECT);
  });

  it('correctly stores function declarations', () => {
    const syntek: Syntek = new Syntek();
    const object = syntek.literalHandler.object(new Context(), function () {
      this.declareVariable('fn', DataType.FUNCTION, syntek.literalHandler.function(
        this,
        'fn',
        [],
        function () {
          return syntek.literalHandler.number(5);
        },
        DataType.NUMBER,
      ));
    });

    const fn = object.getProperty('fn');
    expect(fn).to.be.an.instanceof(VariableStruct);
    expect(fn.type).to.equal(DataType.FUNCTION);

    const returnValue: NumberStruct = fn.exec([]);
    expect(returnValue).to.be.an.instanceof(NumberStruct);
    expect(returnValue.toNumber()).to.equal(5);
  });

  it('correctly stores variable declarations', () => {
    const syntek: Syntek = new Syntek();
    const object = syntek.literalHandler.object(new Context(), function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
    });

    const x = object.getProperty('x');
    expect(x).to.be.an.instanceof(VariableStruct);
    expect(x.type).to.equal(DataType.NUMBER);
    expect(x.toNumber()).to.equal(5);
  });

  it('correctly stores object declarations', () => {
    const syntek: Syntek = new Syntek();
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

  it('does not override variables outside of the object', () => {
    const syntek: Syntek = new Syntek();
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    syntek.literalHandler.object(context, function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));
    });

    const x = context.getVariable('x');
    expect(x.toNumber()).to.equal(5);
  });

  it('does override variables outside of the object when inside a function', () => {
    const syntek: Syntek = new Syntek();
    syntek.createProgram(function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

      this.declareVariable('obj', DataType.OBJECT, syntek.literalHandler.object(this, function () {
        this.declareVariable('changeX', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'changeX',
          [],
          function () {
            this.declareVariable('x', DataType.ANY, syntek.literalHandler.number(10));
          },
          DataType.ANY,
        ));
      }));

      expect(this.getVariable('x').toNumber()).to.equal(5);
      this.getVariable('obj').getProperty('changeX').exec([]);
      expect(this.getVariable('x').toNumber()).to.equal(10);
    });
  });

  it('does not override variables when nesting objects', () => {
    const syntek: Syntek = new Syntek();
    syntek.createProgram(function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

      this.declareVariable('obj', DataType.OBJECT, syntek.literalHandler.object(this, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));

        this.declareVariable('nested', DataType.OBJECT, syntek.literalHandler.object(this, function () {
          this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(15));
        }));
      }));

      expect(this.getVariable('x').toNumber()).to.equal(5);
      expect(this.getVariable('obj').getProperty('x').toNumber()).to.equal(10);
      expect(this.getVariable('obj').getProperty('nested').getProperty('x').toNumber()).to.equal(15);
    });
  });

  it('can access own properties in functions', () => {
    const syntek: Syntek = new Syntek();
    syntek.createProgram(function () {
      this.declareVariable('obj', DataType.OBJECT, syntek.literalHandler.object(this, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

        this.declareVariable('checkX', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'checkX',
          [],
          function () {
            const x = this.getVariable('obj').getProperty('x');

            expect(x).to.be.an.instanceof(VariableStruct);
            expect(x.type).to.equal(DataType.NUMBER);
            expect(x.toNumber()).to.equal(5);
          },
          DataType.ANY,
        ));
      }));

      this.getVariable('obj').getProperty('checkX').exec([]);
    });
  });

  it('correctly turns into a JSON string');

  it('throws when turned into a number', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      expect(() => {
        syntek.literalHandler.object(this, function () {}).toNumber();
      }).to.throw();
    });
  });

  it('throws when used as a function', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      expect(() => {
        syntek.literalHandler.object(this, function () {}).exec([]);
      }).to.throw();
    });
  });

  it('throws when called with new', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      expect(() => {
        syntek.literalHandler.object(this, function () {}).createNew([]);
      }).to.throw();
    });
  });
});
