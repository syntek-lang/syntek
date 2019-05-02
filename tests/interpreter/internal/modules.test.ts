/* eslint-disable prefer-arrow-callback, func-names */

import 'mocha';
import { expect } from 'chai';

import Syntek from '../../../src/interpreter/internal/Syntek';
import { DataType, ModuleStruct, VariableStruct } from '../../../src/interpreter/internal/structures';

describe('Modules', () => {
  it('correctly creates a module', () => {
    const syntek: Syntek = new Syntek();

    syntek.declareModule('module', function () {});

    expect(syntek.getModule('module')).to.be.an.instanceof(ModuleStruct);
    expect(syntek.getModule('module').type).to.equal(DataType.MODULE);
  });

  it('correctly stores variables', () => {
    const syntek: Syntek = new Syntek();

    syntek.declareModule('module', function () {
      this.declareVariable('x', DataType.NUMBER, syntek.literalHandler.number(5));
    });

    const x = syntek.getModule('module').getProperty('x');
    expect(x).to.be.an.instanceof(VariableStruct);
    expect(x.type).to.equal(DataType.NUMBER);
    expect(x.toNumber()).to.equal(5);
  });

  it('throws an error if a module is already declared', () => {
    const syntek: Syntek = new Syntek();

    syntek.declareModule('module', function () {});

    expect(() => {
      syntek.declareModule('module', function () {});
    }).to.throw();
  });

  it('throws an error if a module does not exist', () => {
    const syntek: Syntek = new Syntek();

    expect(() => {
      syntek.getModule('module');
    }).to.throw();
  });
});
