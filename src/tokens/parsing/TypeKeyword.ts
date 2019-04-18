import { $, LookaheadRule } from '../../structures/rule';
import tokens from '../lexing';

const rule = new LookaheadRule();
rule.setRule(
  $.OR(
    tokens.NumberKeyword,
    tokens.StringKeyword,
    tokens.BooleanKeyword,
    tokens.ObjectKeyword,
    tokens.AnyKeyword,
  ),
);

export default rule;
