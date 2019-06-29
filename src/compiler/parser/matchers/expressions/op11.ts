import { Node } from '../../..';

import { ExpressionMatcher } from '../ExpressionMatcher';

// https://docs.syntek.dev/spec/operator-precedence.html
// | TODO: Member Expression
// | TODO: Index Expression
// | TODO: New Expression
// | TODO: Call Expression

export function op11(this: ExpressionMatcher): Node {
  return this.op12();
}
