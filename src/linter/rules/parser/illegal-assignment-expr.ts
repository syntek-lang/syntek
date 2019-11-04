import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const illegalAssignmentExpr: LinterRule = {
  description: 'Report illegal assignments',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.AssignmentExpression, (node, ctx) => {
      if (ctx.parents[ctx.parents.length - 1].type !== grammar.SyntacticToken.EXPRESSION_STMT) {
        report('Assignments can not be inside another expression', node.span);
      }

      switch (node.left.type) {
        case grammar.SyntacticToken.IDENTIFIER:
        case grammar.SyntacticToken.MEMBER_EXPR:
        case grammar.SyntacticToken.INDEX_EXPR:
          break;
        default:
          report('You can only assign to an identifier, member expression, and index expression', node.left.span);
          break;
      }
    });
  },
};
