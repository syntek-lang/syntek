import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const importAtTopLevel: LinterRule = {
  description: 'Report when an import declaration is not at the top level',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ImportDeclaration, (node, _, parents) => {
      if (parents[parents.length - 1].type !== grammar.SyntacticToken.PROGRAM) {
        report('An import can only be at the top level', node.span);
      }
    });
  },
};
