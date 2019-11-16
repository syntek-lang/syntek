import 'mocha';
import { expect } from 'chai';

import { parse } from '../test-utils';

import * as grammar from '../../src/grammar';
import { mangleFunctionName, mangleConstructor } from '../../src/symbols/mangle';

type Func = grammar.FunctionDeclaration | grammar.EmptyFunctionDeclaration;

describe('mangle', () => {
  describe('correctly mangles function', () => {
    const tests: [string, string][] = [
      ['function foo()', 'foo'],
      ['function foo(): Object', 'foo'],
      ['function foo(): Array<Object>', 'foo'],

      ['function foo(x: Object)', 'foo-Object'],
      ['function foo(x: Object, y: Number)', 'foo-Object-Number'],

      ['function foo(x: Object[])', 'foo-Object['],
      ['function foo(x: Object[][])', 'foo-Object[['],

      ['function foo(x: Array<Object>)', 'foo-Array<Object>'],
      ['function foo(x: Array<Object[]>)', 'foo-Array<Object[>'],

      ['function <T> foo()', 'foo'],
      ['function <T> foo(x: T)', 'foo-Object'],

      ['function <T extends E> foo()', 'foo'],
      ['function <T extends E> foo(x: T)', 'foo-E'],

      ['function <T extends E[]> foo(x: T)', 'foo-E['],
      ['function <T extends E[][]> foo(x: T)', 'foo-E[['],

      ['function <T, E extends Array<T>> foo(t: T, e: E)', 'foo-Object-Array<Object>'],
      ['function <A extends B, C extends Array<A>> foo(a: A, b: B, c: C)', 'foo-B-B-Array<B>'],
    ];

    tests.forEach(([input, output]) => {
      it(input, () => {
        const program = parse(input);
        const mangled = mangleFunctionName(program.body[0] as Func);

        expect(mangled).to.equal(output);
      });
    });
  });

  describe('correctly mangles constructor', () => {
    const tests: [string, string][] = [
      ['class A<T> { new(t: T) {} }', 'Object'],
      ['class A<T extends E> { new(t: T) {} }', 'E'],
      ['class A<T, E> { new(t: T, e: E) {} }', 'Object-Object'],

      ['class A<B extends C, D extends B> { new(d: D) {} }', 'C'],
      ['class A<B extends C[][]> { new(b: B) {} }', 'C[['],

      ['class A<B extends C, D extends Array<B>> { new(b: B, c: C, d: D) {} }', 'C-C-Array<C>'],
    ];

    tests.forEach(([input, output]) => {
      it(input, () => {
        const program = parse(input);
        const decl = program.body[0] as grammar.ClassDeclaration;

        const mangled = mangleConstructor(decl.constructors[0], decl.genericParams);

        expect(mangled).to.equal(output);
      });
    });
  });
});
