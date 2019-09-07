import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const declarationsInClass: LinterRule = {
  description: 'Report when an expression or statement is in a class body',
  level: Level.ERROR,
  create(walker, report) {
    function checkNode(node: grammar.Node): void {
      if (!grammar.isDeclaration(node)) {
        report('You can only put declarations in a class body', node.span);
      }
    }

    walker.onEnter(grammar.ClassDeclaration, (classNode) => {
      classNode.staticBody.forEach(checkNode);
      classNode.instanceBody.forEach(checkNode);
    });
  },
};
