import { $ } from '../../structures';
import tokens from '..';

import Expression from './Expression';

import PowEquation from './math/PowEquation';
import MdEquation from './math/MdEquation';
import Equation from './math/Equation';

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
