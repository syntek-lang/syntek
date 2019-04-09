import * as keywords from './keywords';
import * as arithmeticOperators from './operators/arithmetic';
import * as assignmentOperators from './operators/assignment';
import * as comparisonOperators from './operators/comparison';
import * as logicalOperators from './operators/logical';
import * as datatypes from './datatypes';
import * as punctuation from './punctuation';
import * as whitespace from './whitespace';

export default {
  ...keywords,
  ...arithmeticOperators,
  ...assignmentOperators,
  ...comparisonOperators,
  ...logicalOperators,
  ...datatypes,
  ...punctuation,
  ...whitespace,
};
