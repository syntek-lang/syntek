import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const classAtTopLevel: LinterRule = {
  description: 'Report when a class declaration is not at the top level',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ClassDeclaration, (node, ctx) => {
      if (ctx.parents[ctx.parents.length - 1].type !== grammar.SyntacticToken.PROGRAM) {
        report('A class can only be declared at the top level', node.span);
      }
    });
  },
};
