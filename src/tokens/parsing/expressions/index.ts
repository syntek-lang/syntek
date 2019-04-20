import { $ } from '../../../structures/rule';
import tokens from '../../lexing';

import Expression from './Expression';
import { NewExpression, NewExpressionMatcher } from './NewExpression';
import { MemberExpression, MemberExpressionMatcher } from './MemberExpression';
import { ExpressionStatement, ExpressionStatementMatcher } from './ExpressionStatement';
import { WrappedExpression, WrappedExpressionMatcher } from './WrappedExpression';
import { ComparisonExpression, ComparisonExpressionMatcher } from './ComparisonExpression';
import { NotExpression, NotExpressionMatcher } from './NotExpression';
import { LogicalExpression, LogicalExpressionMatcher } from './LogicalExpression';

import { ArrayExpression, ArrayExpressionMatcher } from './ArrayExpression';
import { ObjectExpression, ObjectExpressionMatcher } from './ObjectExpression';

import { PowEquation, PowEquationMatcher } from './math/PowEquation';
import { MdEquation, MdEquationMatcher } from './math/MdEquation';
import { Equation, EquationMatcher } from './math/Equation';

Expression.setRule($.OR(
  tokens.NumberLiteral,
  tokens.BooleanLiteral,
  tokens.StringLiteral,
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

export const matchers = {
  NewExpressionMatcher,
  MemberExpressionMatcher,
  ExpressionStatementMatcher,
  WrappedExpressionMatcher,
  ComparisonExpressionMatcher,
  NotExpressionMatcher,
  LogicalExpressionMatcher,
  ArrayExpressionMatcher,
  ObjectExpressionMatcher,

  PowEquationMatcher,
  MdEquationMatcher,
  EquationMatcher,
};
