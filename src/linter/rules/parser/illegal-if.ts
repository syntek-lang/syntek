import * as grammar from '../../../grammar';

import { LinterRule } from '../..';
import { Level } from '../../../diagnostic';

function isExpr(node: grammar.IfExpression, parents: grammar.Node[]): boolean {
  for (let i = parents.length - 1; i >= 0; i -= 1) {
    const parent = parents[i];

    if (parent.type === grammar.SyntacticToken.IF_EXPR) {
      if ((parent as grammar.IfExpression).elseClause !== node) {
        // If the parent if statement is not part of this statement it's an expression
        return true;
      }
    } else {
      return parent.type !== grammar.SyntacticToken.EXPRESSION_STMT;
    }
  }

  return false;
}

export const illegalIf: LinterRule = {
  description: 'Report illegal if expressions',
  level: Level.ERROR,
  create(walker, report) {
    walker.onEnter(grammar.IfExpression, (node, _, parents) => {
      if (isExpr(node, parents)) {
        if (!node.elseClause) {
          report('An if expression must have an else body', node.span);
        }
      }
    });
  },
};
