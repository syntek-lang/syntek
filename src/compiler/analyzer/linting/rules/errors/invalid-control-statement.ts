import * as grammar from '../../../../../grammar';

import { LintingRule } from '../..';
import { Level } from '../../../../../diagnostic';

export const invalidControlStatement: LintingRule = {
  name: 'invalid-control-statement',
  description: 'Report invalid control statements',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.ReturnStatement, (node, _, parents) => {
      const isValid = parents.some(parent => parent.type === grammar.SyntacticToken.FUNCTION_DECL);

      if (!isValid) {
        report('You can only place return inside a function', node.span);
      }
    });

    walker.onEnter(grammar.BreakStatement, (node, _, parents) => {
      const isValid = parents.some(
        parent => grammar.isLoop(parent) || parent.type === grammar.SyntacticToken.SWITCH_CASE,
      );

      if (!isValid) {
        report('You can only place break inside a loop or switch case', node.span);
      }
    });

    walker.onEnter(grammar.ContinueStatement, (node, _, parents) => {
      const isValid = parents.some(grammar.isLoop);

      if (!isValid) {
        report('You can only place continue inside a loop', node.span);
      }
    });

    walker.onEnter(grammar.FallthroughStatement, (node, _, parents) => {
      const isValid = parents.some(parent => parent.type === grammar.SyntacticToken.SWITCH_CASE);

      if (!isValid) {
        report('You can only place fallthrough inside a switch case', node.span);
      }
    });
  },
};
