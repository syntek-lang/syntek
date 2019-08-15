import * as grammar from '../../../../../grammar';

import { LintingRule } from '../..';
import { Level } from '../../../../../diagnostic';

export const invalidClassBody: LintingRule = {
  name: 'invalid-class-body',
  description: 'Report invalid class bodies',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ClassDeclaration, (classNode) => {
      function checkNode(node: grammar.Node): void {
        if (!grammar.isDeclaration(node)) {
          report('You can only put declarations in a class body', node.span);
        }
      }

      classNode.staticBody.forEach(checkNode);
      classNode.instanceBody.forEach(checkNode);
    });
  },
};
