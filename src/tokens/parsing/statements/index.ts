import { $ } from '../../../structures/rule';
import tokens from '../../lexing';

import Statement from './Statement';

import { IfStatement, IfStatementMatcher } from './IfStatement';
import { ReturnStatement, ReturnStatementMatcher } from './ReturnStatement';

import { RepeatStatement, RepeatStatementMatcher } from './loops/RepeatStatement';
import { WhileStatement, WhileStatementMatcher } from './loops/WhileStatement';
import { ForStatement, ForStatementMatcher } from './loops/ForStatement';

Statement.setRule($.OR(
  tokens.Break,
  tokens.Continue,

  IfStatement,
  ReturnStatement,

  RepeatStatement,
  WhileStatement,
  ForStatement,
));

export default {
  IfStatement,
  ReturnStatement,

  RepeatStatement,
  WhileStatement,
  ForStatement,
};

export const matchers = {
  IfStatementMatcher,
  ReturnStatementMatcher,

  RepeatStatementMatcher,
  WhileStatementMatcher,
  ForStatementMatcher,
};
