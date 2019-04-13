import { $ } from '../../../structures/rule';

import Statement from './Statement';

import IfStatement from './IfStatement';
import ReturnStatement from './ReturnStatement';

import RepeatStatement from './loops/RepeatStatement';
import WhileStatement from './loops/WhileStatement';
import ForStatement from './loops/ForStatement';

Statement.setRule($.OR(
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
