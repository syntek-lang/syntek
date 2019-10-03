import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

export const illegalIf: LinterRule = {
  description: 'Report illegal if expressions',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.IfExpression, (node, _, parents) => {
      const isExpr = parents[parents.length - 1].type !== grammar.SyntacticToken.EXPRESSION_STMT;

      if (isExpr) {
        let elseClause = node.elseClause;

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (!elseClause) {
            report('An if expression must have an else body', node.span);
            break;
          }

          if (elseClause.type === grammar.SyntacticToken.IF_EXPR) {
            elseClause = (elseClause as grammar.IfExpression).elseClause;
          } else if (elseClause.type === grammar.SyntacticToken.ELSE_EXPR) {
            break;
          }
        }
      }
    });
  },
};
