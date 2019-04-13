import { $ } from '../structures/rule';
import tokens from './lexing';

import Expression from './parsing/expressions/Expression';

import PowEquation from './parsing/expressions/math/PowEquation';
import MdEquation from './parsing/expressions/math/MdEquation';
import Equation from './parsing/expressions/math/Equation';

Expression.setRule($.OR(
  tokens.Number,
  PowEquation,
  MdEquation,
  Equation,
));

export default {
  PowEquation,
  MdEquation,
  Equation,
};
