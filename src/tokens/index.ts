export default {
  // Keywords
  function: /^function/,
  if: /^if/,
  elseIf: /^else if/,
  else: /^else/,

  // Arithmetic Operators
  pow: /^\^/,
  star: /^\*/,
  slash: /^\//,
  modulo: /^%/,
  plus: /^\+/,
  minus: /^-/,

  // Assignment Operator
  equal: /^=/,

  // Comparison Operators
  isNot: /^is not/,
  isGreaterThan: /^is greater than/,
  isLessThan: /^is less than/,
  is: /^is/,

  // Logical Operators
  and: /^and/,
  or: /^or/,
  not: /^not/,

  // Datatypes
  boolean: /^true|false/,
  number: /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/,
  string: /'(?:[^'\\]|\\.)*'/,
  symbol: /^[a-z$_][a-z$_0-9]*/i,

  // Parentheses
  lpar: /^\(/,
  rpar: /^\)/,

  // Whitespace
  tab: /^\t/,
  newline: /^\r?\n/,
  emptyline: /^(\r?\n[ \t\f]*\r?\n)+/,
  space: /^ +/,
};
