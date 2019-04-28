import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/api/internal/Syntek';
import {
  DataType, NumberStruct, VariableStruct, Context,
} from '../../../src/api/internal/structures';

describe('Variables', () => {
  const syntek: Syntek = new Syntek();

  it('creates an object correctly', () => {
    const context = new Context();
    context.declareVariable('x', DataType.ANY, syntek.literalHandler.number(5));

    const x = context.getVariable('x') as VariableStruct;
    expect(x).to.be.an.instanceof(VariableStruct);
    expect(x.type).to.equal(DataType.ANY);
    expect(x.value).to.be.an.instanceof(NumberStruct);
    expect(x.value.type).to.equal(DataType.NUMBER);
  });

  it('throws when assigned with the wrong type', () => {
    const context = new Context();

    expect(() => {
      context.declareVariable('x', DataType.STRING, syntek.literalHandler.number(5));
    }).to.throw();
  });

  it('correctly stores the type of a variable', () => {
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    const x = context.getVariable('x');
    expect(x).to.be.an.instanceof(VariableStruct);
    expect(x.type).to.equal(DataType.NUMBER);
  });

  it('correctly reassigns a variable', () => {
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    const firstX = context.getVariable('x');
    expect(firstX).to.be.an.instanceof(VariableStruct);
    expect(firstX.type).to.equal(DataType.NUMBER);
    expect(firstX.toNumber()).to.equal(5);

    context.declareVariable('x', DataType.ANY, syntek.literalHandler.number(10));

    const secondX = context.getVariable('x');
    expect(secondX).to.be.an.instanceof(VariableStruct);
    expect(secondX.type).to.equal(DataType.NUMBER);
    expect(secondX.toNumber()).to.equal(10);
  });

  it('throws when reassigned with the wrong type', () => {
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    expect(() => {
      context.declareVariable('x', DataType.ANY, syntek.literalHandler.object(context, () => {}));
    }).to.throw();
  });

  it('throws when reassigned with a type other than ANY', () => {
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    expect(() => {
      context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(10));
    }).to.throw();
  });

  it('throws when trying to reassign a function', () => {
    const context = new Context();
    context.declareVariable('fn', DataType.FUNCTION, syntek.literalHandler.function(
      context,
      'fn',
      [],
      () => {},
      DataType.ANY,
    ));

    expect(() => {
      context.declareVariable('fn', DataType.NUMBER, syntek.literalHandler.number(5));
    }).to.throw();
  });

  it('throws when trying to reassign a variable with a function', () => {
    const context = new Context();
    context.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));

    expect(() => {
      context.declareVariable('x', DataType.FUNCTION, syntek.literalHandler.function(
        context,
        'x',
        [],
        () => {},
        DataType.ANY,
      ));
    }).to.throw();
  });
});
