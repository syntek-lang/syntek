import * as keywords from './lexing/keywords';
import * as arithmeticOperators from './lexing/operators/arithmetic';
import * as assignmentOperators from './lexing/operators/assignment';
import * as comparisonOperators from './lexing/operators/comparison';
import * as logicalOperators from './lexing/operators/logical';
import * as datatypes from './lexing/datatypes';
import * as punctuation from './lexing/punctuation';
import * as whitespace from './lexing/whitespace';

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
