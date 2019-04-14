import { $ } from '../../../structures/rule';
import tokens from '../../lexing';

import Statement from './Statement';

import IfStatement from './IfStatement';
import ReturnStatement from './ReturnStatement';

import RepeatStatement from './loops/RepeatStatement';
import WhileStatement from './loops/WhileStatement';
import ForStatement from './loops/ForStatement';

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
