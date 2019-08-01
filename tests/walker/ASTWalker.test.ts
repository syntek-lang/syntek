import 'mocha';
import { expect } from 'chai';

import { parse } from '../test-utils';

import { ASTWalker } from '../../src/walker/ASTWalker';

import { Node } from '../../src/grammar/Node';
import { SyntacticToken } from '../../src/grammar/SyntacticToken';

describe('ASTWalker', () => {
  const program = parse('10 + 2 * 5');

  it('calls the callbacks on enter', () => {
    const array: Node[] = [];
    let parentCount = 0;

    function walkerCallback(node: Node, parents: Node[]): void {
      array.push(node);

      expect(parents.length).to.equal(parentCount);
      parentCount += 1;
    }

    new ASTWalker(program)
      .onEnter(SyntacticToken.PROGRAM, walkerCallback)
      .onEnter(SyntacticToken.EXPRESSION_STMT, walkerCallback)
      .onEnter(SyntacticToken.BINARY_EXPR, walkerCallback)
      .walk();

    expect(parentCount).to.equal(4);
    expect(array.length).to.equal(4);
    expect(array).to.deep.equal([
      program,
      program.body[0],
      (program.body[0] as any).expression,
      (program.body[0] as any).expression.right,
    ]);
  });

  it('calls the callbacks on leave', () => {
    const array: Node[] = [];
    let parentCount = 3;

    function walkerCallback(node: Node, parents: Node[]): void {
      array.push(node);

      expect(parents.length).to.equal(parentCount);
      parentCount -= 1;
    }

    new ASTWalker(program)
      .onLeave(SyntacticToken.PROGRAM, walkerCallback)
      .onLeave(SyntacticToken.EXPRESSION_STMT, walkerCallback)
      .onLeave(SyntacticToken.BINARY_EXPR, walkerCallback)
      .walk();

    expect(parentCount).to.equal(-1);
    expect(array.length).to.equal(4);
    expect(array).to.deep.equal([
      (program.body[0] as any).expression.right,
      (program.body[0] as any).expression,
      program.body[0],
      program,
    ]);
  });

  it('calls the callbacks when both enter and leave are provided', () => {
    const array: Node[] = [];
    let parentCount = 0;

    function walkerCallback(node: Node, parents: Node[], enter: boolean): void {
      array.push(node);

      if (!enter) {
        parentCount -= 1;
      }

      expect(parents.length).to.equal(parentCount);

      if (enter) {
        parentCount += 1;
      }
    }

    const onEnter = (node: Node, parents: Node[]): void => walkerCallback(node, parents, true);
    const onLeave = (node: Node, parents: Node[]): void => walkerCallback(node, parents, false);

    new ASTWalker(program)
      .onEnter(SyntacticToken.PROGRAM, onEnter)
      .onLeave(SyntacticToken.PROGRAM, onLeave)
      .onEnter(SyntacticToken.EXPRESSION_STMT, onEnter)
      .onLeave(SyntacticToken.EXPRESSION_STMT, onLeave)
      .onEnter(SyntacticToken.BINARY_EXPR, onEnter)
      .onLeave(SyntacticToken.BINARY_EXPR, onLeave)
      .walk();

    expect(parentCount).to.equal(0);
    expect(array.length).to.equal(8);
    expect(array).to.deep.equal([
      program,
      program.body[0],
      (program.body[0] as any).expression,
      (program.body[0] as any).expression.right,
      (program.body[0] as any).expression.right,
      (program.body[0] as any).expression,
      program.body[0],
      program,
    ]);
  });
});
