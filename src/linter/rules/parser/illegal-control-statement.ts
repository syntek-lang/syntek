import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

function inLoopOrSwitch(parents: grammar.Node[]): boolean {
  return parents
    .some(parent => grammar.isLoop(parent) || parent.type === grammar.SyntacticToken.SWITCH_CASE);
}

export const illegalControlStatement: LinterRule = {
  description: 'Report illegal control statements',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ReturnStatement, (node, { parents }) => {
      // Return must be inside a function
      const isValid = parents
        .some(parent => parent.type === grammar.SyntacticToken.FUNCTION_DECL);

      if (!isValid) {
        report('You can only place return inside a function', node.span);
      }
    });

    walker.onEnter(grammar.YieldStatement, (node, { parents }) => {
      const isValid = parents.some(parent => parent.type === grammar.SyntacticToken.IF_EXPR);

      if (!isValid) {
        report('You can only place yield inside an if expression', node.span);
      }
    });

    walker.onEnter(grammar.BreakStatement, (node, { parents }) => {
      if (!inLoopOrSwitch(parents)) {
        report('You can only place break inside a loop or switch case', node.span);
      }
    });

    walker.onEnter(grammar.ContinueStatement, (node, { parents }) => {
      if (!inLoopOrSwitch(parents)) {
        report('You can only place continue inside a loop or switch case', node.span);
      }
    });
  },
};
