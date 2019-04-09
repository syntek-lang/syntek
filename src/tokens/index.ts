export default {
  // Keywords
  function: /^function(?![a-zA-Z_-])/,
  returns: /^returns(?![a-zA-Z_-])/,
  return: /^return(?![a-zA-Z_-])/,
  if: /^if(?![a-zA-Z_-])/,
  elseIf: /^else if(?![a-zA-Z_-])/,
  else: /^else(?![a-zA-Z_-])/,
  for: /^for(?![a-zA-Z_-])/,
  while: /^while(?![a-zA-Z_-])/,
  repeat: /^repeat(?![a-zA-Z_-])/,
  times: /^times(?![a-zA-Z_-])/,
  import: /^import(?![a-zA-Z_-])/,
  as: /^as(?![a-zA-Z_-])/,

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
  isNot: /^is not(?![a-zA-Z_-])/,
  isGreaterThan: /^is greater than(?![a-zA-Z_-])/,
  isLessThan: /^is less than(?![a-zA-Z_-])/,
  is: /^is(?![a-zA-Z_-])/,

  // Logical Operators
  and: /^and(?![a-zA-Z_-])/,
  or: /^or(?![a-zA-Z_-])/,
  not: /^not(?![a-zA-Z_-])/,

  // Datatypes
  boolean: /^(true|false)(?![a-zA-Z_-])/,
  number: /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/,
  string: /^'(?:[^'\\]|\\.)*'/,
  symbol: /^[a-z$_][a-z$_0-9]*/i,

  // Extras
  lpar: /^\(/,
  rpar: /^\)/,
  rbra: /^\[/,
  lbra: /^\]/,
  comma: /^,/,

  // Whitespace
  tab: /^\t/,
  newline: /^\r?\n/,
  emptyline: /^(\r?\n[ \t\f]*\r?\n)+/,
  space: /^ +/,
  comment: /^ *#[^\r\n]+/,
};
