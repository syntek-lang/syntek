/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import { DataType, VariableStruct, ObjectStruct } from '../../../src/api/internal/structures';

describe('Classes', () => {
  it('creates a class object correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      const MyClass = this.getVariable('MyClass');
      expect(MyClass).to.be.an.instanceof(VariableStruct);
      expect(MyClass.type).to.equal(DataType.CLASS);
    });
  });

  it('correctly stores static variables', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      }, function () {}));

      const x = this.getVariable('MyClass').getProperty('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);
    });
  });

  it('throws when accessing a static variable that does not exist', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').getProperty('x');
      }).to.throw();
    });
  });

  it('can be turned into an instance', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      const myClass = this.getVariable('MyClass').createNew([]);
      expect(myClass).to.be.an.instanceof(ObjectStruct);
      expect(myClass.type).to.equal(DataType.OBJECT);
    });
  });

  it('calls the constructor when instantiated');

  it('correctly stores instance variables', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      }));

      const myClass = this.getVariable('MyClass').createNew([]);
      const x = myClass.getProperty('x');
      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);
    });
  });

  it('can access static properties from within a function', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      }, function () {
        this.declareVariable('checkX', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'checkX',
          [],
          function () {
            const x = this.getVariable('MyClass').getProperty('x');
            expect(x).to.be.an.instanceof(VariableStruct);
            expect(x.type).to.equal(DataType.NUMBER);
            expect(x.toNumber()).to.equal(5);
          },
          DataType.ANY,
        ));
      }));

      this.getVariable('MyClass').createNew([]).getProperty('checkX').exec([]);
    });
  });

  it('can access instance properties within a function');

  it('throws when turned into a number', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').toNumber();
      }).to.throw();
    });
  });

  it('throws when turned into a string', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').toString();
      }).to.throw();
    });
  });

  it('throws when used as a function', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').exec([]);
      }).to.throw();
    });
  });
});
