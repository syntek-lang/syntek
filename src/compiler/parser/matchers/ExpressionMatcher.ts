import { Token, Node, LexicalToken } from '../..';

import { Matcher } from './Matcher';
import * as ops from './expressions';

export class ExpressionMatcher extends Matcher {
  readonly op3: ops.OpFunction;

  readonly op4: ops.OpFunction;

  readonly op5: ops.OpFunction;

  readonly op6: ops.OpFunction;

  readonly op7: ops.OpFunction;

  readonly op8: ops.OpFunction;

  readonly op9: ops.OpFunction;

  readonly op10: ops.OpFunction;

  readonly op11: ops.OpFunction;

  readonly op12: ops.OpFunction;

  constructor(tokens: Token[]) {
    super(tokens);

    this.op3 = ops.op3;
    this.op4 = ops.op4;
    this.op5 = ops.op5;
    this.op6 = ops.op6;
    this.op7 = ops.op7;
    this.op8 = ops.op8;
    this.op9 = ops.op9;
    this.op10 = ops.op10;
    this.op11 = ops.op11;
    this.op12 = ops.op12;
  }

  expression(): Node {
    return this.op3();
  }

  protected isComparisonToken(token: Token): boolean {
    return token.type === LexicalToken.GREATER || token.type === LexicalToken.LESS;
  }
}
