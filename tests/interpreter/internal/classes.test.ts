/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/interpreter/internal/Syntek';
import { DataType, VariableStruct, ObjectStruct } from '../../../src/interpreter/internal/structures';

describe('Classes', () => {
  it('creates a class object correctly', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      const MyClass = this.getVariable('MyClass');
      expect(MyClass).to.be.an.instanceof(VariableStruct);
      expect(MyClass.type).to.equal(DataType.CLASS);
    });
  });

  it('correctly stores static variables', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {
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
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').getProperty('x');
      }).to.throw();
    });
  });

  it('can be turned into an instance', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      const myClass = this.getVariable('MyClass').createNew([]);
      expect(myClass).to.be.an.instanceof(ObjectStruct);
      expect(myClass.type).to.equal(DataType.OBJECT);
    });
  });

  it('calls the constructor when instantiated', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {
        this.declareVariable('MyClass', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'MyClass',
          [{ type: DataType.NUMBER, name: 'x' }],
          function () {
            const x = this.getVariable('x');

            expect(x).to.be.an.instanceof(VariableStruct);
            expect(x.type).to.equal(DataType.NUMBER);
            expect(x.toNumber()).to.equal(5);
          },
          DataType.ANY,
        ));
      }));

      this.getVariable('MyClass').createNew([syntek.literalHandler.number(5)]);
    });
  });

  it('correctly stores instance variables', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {
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
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {
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

  it('can access instance properties within a function', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

        this.declareVariable('checkX', DataType.FUNCTION, syntek.literalHandler.function(
          this,
          'checkX',
          [],
          function () {
            const x = this.getVariable('this').getProperty('x');

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

  it('correctly updates static properties', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      }, function () {}));

      const myClass = this.getVariable('MyClass');
      const x = myClass.getProperty('x');

      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);

      myClass.setProperty('x', syntek.literalHandler.number(10));
      const newX = myClass.getProperty('x');

      expect(newX).to.be.an.instanceof(VariableStruct);
      expect(newX.type).to.equal(DataType.NUMBER);
      expect(newX.toNumber()).to.equal(10);
    });
  });

  it('correctly updates instance properties', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
      }));

      const myClass = this.getVariable('MyClass').createNew([]);
      const x = myClass.getProperty('x');

      expect(x).to.be.an.instanceof(VariableStruct);
      expect(x.type).to.equal(DataType.NUMBER);
      expect(x.toNumber()).to.equal(5);

      myClass.setProperty('x', syntek.literalHandler.number(10));
      const newX = myClass.getProperty('x');

      expect(newX).to.be.an.instanceof(VariableStruct);
      expect(newX.type).to.equal(DataType.NUMBER);
      expect(newX.toNumber()).to.equal(10);
    });
  });

  it('correctly turns to json', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {
        this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
        this.declareVariable('y', DataType.NUMBER, syntek.literalHandler.number(10));
        this.declareVariable('z', DataType.NUMBER, syntek.literalHandler.number(15));
      }, function () {}));

      expect(this.getVariable('MyClass').toJson()).to.eql({
        x: 5,
        y: 10,
        z: 15,
      });
    });
  });

  it('throws when turned into a number', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').toNumber();
      }).to.throw();
    });
  });

  it('throws when turned into a string', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').toString();
      }).to.throw();
    });
  });

  it('throws when used as a function', () => {
    const syntek: Syntek = new Syntek();

    syntek.createProgram(function () {
      this.declareVariable('MyClass', DataType.CLASS, syntek.literalHandler.class(this, 'MyClass', function () {}, function () {}));

      expect(() => {
        this.getVariable('MyClass').exec([]);
      }).to.throw();
    });
  });
});
