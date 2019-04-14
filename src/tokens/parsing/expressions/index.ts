import { $ } from '../../../structures/rule';
import tokens from '../../lexing';

import Expression from './Expression';
import NewExpression from './NewExpression';
import MemberExpression from './MemberExpression';
import ExpressionStatement from './ExpressionStatement';
import WrappedExpression from './WrappedExpression';
import ComparisonExpression from './ComparisonExpression';
import NotExpression from './NotExpression';
import LogicalExpression from './LogicalExpression';

import ArrayExpression from './ArrayExpression';
import ObjectExpression from './ObjectExpression';

import PowEquation from './math/PowEquation';
import MdEquation from './math/MdEquation';
import Equation from './math/Equation';

Expression.setRule($.OR(
  tokens.Number,
  tokens.Boolean,
  tokens.String,
  tokens.Symbol,

  NewExpression,
  MemberExpression,
  ExpressionStatement,
  WrappedExpression,
  ComparisonExpression,
  NotExpression,
  LogicalExpression,

  ArrayExpression,
  ObjectExpression,

  PowEquation,
  MdEquation,
  Equation,
));

export default {
  NewExpression,
  MemberExpression,
  ExpressionStatement,
  WrappedExpression,
  ComparisonExpression,
  NotExpression,
  LogicalExpression,

  ArrayExpression,
  ObjectExpression,

  PowEquation,
  MdEquation,
  Equation,
};
